import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin (only once)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { query, category } = req.body;

    // Step 1: Fetch ALL services from Firestore
    const servicesRef = db.collection('services');
    let firestoreQuery = servicesRef;
    
    // Filter by category if provided
    if (category && category !== 'all') {
      firestoreQuery = firestoreQuery.where('category', '==', category);
    }

    const snapshot = await firestoreQuery.get();
    const allServices = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      allServices.push({
        id: doc.id,
        name: data.name,
        category: data.category,
        address: data.address,
        phone: data.phone,
        hours: data.hours,
        website: data.website,
        description: data.description,
        languages: data.languages || [],
      });
    });

    console.log(`Fetched ${allServices.length} services from Firestore`);

    // Step 2: Create a summary of services for Gemini
    const servicesSummary = allServices.map(s => 
      `${s.name} (${s.category}): ${s.description}`
    ).join('\n');

    // Step 3: Ask Gemini to analyze and rank services
    const prompt = `You are a helpful assistant for Bridge, a social services directory for NYC refugees and immigrants.

USER QUERY: "${query}"

AVAILABLE SERVICES:
${servicesSummary}

TASK: Analyze the user's query and identify the 5 MOST RELEVANT services from the list above that best match their needs.

Return ONLY a JSON array with the service names in order of relevance (most relevant first).
Format: ["Service Name 1", "Service Name 2", "Service Name 3", "Service Name 4", "Service Name 5"]

If fewer than 5 services are relevant, return only those that match well.
Return ONLY the JSON array, no other text.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.3,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract Gemini's response
    let fullText = '';
    if (data.candidates && data.candidates[0]?.content?.parts) {
      fullText = data.candidates[0].content.parts
        .map((part) => part.text)
        .join('');
    }

    // Clean and parse JSON
    const cleanText = fullText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    let rankedServiceNames = [];
    try {
      rankedServiceNames = JSON.parse(cleanText);
      if (!Array.isArray(rankedServiceNames)) {
        rankedServiceNames = [];
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Received text:', cleanText);
      // Fallback: return first 5 services
      rankedServiceNames = allServices.slice(0, 5).map(s => s.name);
    }

    // Step 4: Map service names back to full service objects
    const rankedServices = rankedServiceNames
      .map(name => allServices.find(s => s.name === name))
      .filter(s => s !== undefined);

    console.log(`Returning ${rankedServices.length} ranked services`);

    return res.status(200).json({
      success: true,
      count: rankedServices.length,
      resources: rankedServices,
      provider: 'gemini-firestore',
      query: query
    });

  } catch (error) {
    console.error('Search error:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message || 'Search failed',
      provider: 'error'
    });
  }
}
