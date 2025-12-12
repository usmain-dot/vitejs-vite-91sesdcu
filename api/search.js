import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

// Initialize Firebase with your existing config
if (!getApps().length) {
  initializeApp({
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    appId: process.env.VITE_FIREBASE_APP_ID
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
    return res.status(500).json({ error: 'Gemini API key not configured' });
  }

  try {
    const { query: searchQuery, category } = req.body;

    // Step 1: Fetch services from Firestore
    const servicesRef = collection(db, 'services');
    let firestoreQuery = servicesRef;
    
    if (category && category !== 'all') {
      firestoreQuery = query(servicesRef, where('category', '==', category));
    }

    const snapshot = await getDocs(firestoreQuery);
    const allServices = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      allServices.push({
        id: doc.id,
        name: data.name || '',
        category: data.category || '',
        address: data.address || '',
        phone: data.phone || '',
        hours: data.hours || '',
        website: data.website || '',
        description: data.description || '',
        languages: data.languages || [],
      });
    });

    console.log(`✅ Fetched ${allServices.length} services from Firestore`);

    // Step 2: Create summary for Gemini
    const servicesSummary = allServices
      .map(s => `${s.name} (${s.category}): ${s.description}`)
      .join('\n');

    // Step 3: Ask Gemini to rank services
    const prompt = `You are analyzing NYC social services for refugees.

USER QUERY: "${searchQuery}"

AVAILABLE SERVICES:
${servicesSummary}

Return ONLY a JSON array with the 3-5 most relevant service names:
["Service Name 1", "Service Name 2", "Service Name 3"]

Return ONLY the JSON array, nothing else.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
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
    let fullText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Extract JSON array
    let cleanText = fullText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
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
      // Fallback: smart keyword matching
      const queryLower = searchQuery.toLowerCase();
      let filtered = allServices;
      
      if (queryLower.includes('mental') || queryLower.includes('health') || queryLower.includes('therapy')) {
        filtered = allServices.filter(s => s.category === 'mental health');
      } else if (queryLower.includes('food') || queryLower.includes('hunger')) {
        filtered = allServices.filter(s => s.category === 'food');
      } else if (queryLower.includes('housing') || queryLower.includes('shelter')) {
        filtered = allServices.filter(s => s.category === 'housing');
      } else if (queryLower.includes('legal') || queryLower.includes('lawyer')) {
        filtered = allServices.filter(s => s.category === 'legal');
      } else if (queryLower.includes('job') || queryLower.includes('work')) {
        filtered = allServices.filter(s => s.category === 'employment');
      }
      
      rankedServiceNames = filtered.slice(0, 5).map(s => s.name);
    }

    // Map names to full service objects
    const rankedServices = rankedServiceNames
      .map(name => allServices.find(s => s.name === name))
      .filter(s => s !== undefined);

    console.log(`✅ Returning ${rankedServices.length} ranked services`);

    return res.status(200).json({
      success: true,
      count: rankedServices.length,
      resources: rankedServices,
      provider: 'gemini-firestore',
      query: searchQuery
    });

  } catch (error) {
    console.error('❌ Search error:', error);
    
    return res.status(200).json({
      success: false,
      error: error.message || 'Search failed',
      provider: 'error',
      resources: []
    });
  }
}
