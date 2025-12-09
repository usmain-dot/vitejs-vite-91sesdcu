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
    const prompt = `You are analyzing a database of NYC social services for refugees and immigrants.

USER QUERY: "${query}"

AVAILABLE SERVICES IN DATABASE:
${servicesSummary}

INSTRUCTIONS:
1. Identify the 3-5 MOST RELEVANT services from the list above
2. Consider the user's specific needs
3. Return ONLY a JSON array with exact service names
4. No explanations, no markdown, no extra text

CRITICAL: Your response must be ONLY a valid JSON array like this:
["NYC Well - Mental Health Support", "NAMI NYC", "The Door - Mental Health Services"]

Return the JSON array now:`;

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
            temperature: 0.1,
            topK: 20,
            topP: 0.8,
            maxOutputTokens: 512,
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

    // Clean and parse JSON - more aggressive cleaning
    let cleanText = fullText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    // Extract JSON array if embedded in text
    const jsonMatch = cleanText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      cleanText = jsonMatch[0];
    }
    
    let rankedServiceNames = [];
    try {
      rankedServiceNames = JSON.parse(cleanText);
      if (!Array.isArray(rankedServiceNames)) {
        rankedServiceNames = [];
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Received text:', cleanText);
      console.error('Full response:', fullText);
      
      // Fallback: Smart filter by category
      const queryLower = query.toLowerCase();
      let filtered = allServices;
      
      // Try to match keywords to categories
      if (queryLower.includes('mental') || queryLower.includes('health') || queryLower.includes('therapy')) {
        filtered = allServices.filter(s => s.category === 'mental health');
      } else if (queryLower.includes('food') || queryLower.includes('hunger') || queryLower.includes('meal')) {
        filtered = allServices.filter(s => s.category === 'food');
      } else if (queryLower.includes('housing') || queryLower.includes('shelter') || queryLower.includes('homeless')) {
        filtered = allServices.filter(s => s.category === 'housing');
      } else if (queryLower.includes('legal') || queryLower.includes('lawyer') || queryLower.includes('immigration')) {
        filtered = allServices.filter(s => s.category === 'legal');
      } else if (queryLower.includes('job') || queryLower.includes('work') || queryLower.includes('employ')) {
        filtered = allServices.filter(s => s.category === 'employment');
      }
      
      rankedServiceNames = filtered.slice(0, 5).map(s => s.name);
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
