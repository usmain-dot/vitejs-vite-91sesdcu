export default async function handler(req, res) {
  // CORS
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
    return res.status(200).json({
      success: true,
      provider: 'mock',
      resources: getMockData(req.body?.query || '')
    });
  }

  try {
    const { query } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `Find social services in NYC for: ${query}. Return as JSON array with name, address, phone, hours, website, category, description.` }]
          }]
        })
      }
    );

    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    let resources = [];
    try {
      resources = JSON.parse(text);
    } catch {
      resources = getMockData(query);
    }

    return res.status(200).json({
      success: true,
      provider: 'gemini',
      resources: Array.isArray(resources) ? resources : [resources]
    });

  } catch (error) {
    return res.status(200).json({
      success: true,
      provider: 'mock',
      resources: getMockData(req.body?.query || '')
    });
  }
}

function getMockData(query) {
  const all = [
    {
      name: "NYC Well - Mental Health Support",
      address: "New York, NY (Call/Text/Chat)",
      phone: "1-888-692-9355",
      hours: "24/7",
      website: "https://nycwell.cityofnewyork.us",
      category: "mental health",
      description: "Free confidential mental health support. Available 24/7 in 200+ languages."
    },
    {
      name: "Food Bank For New York City",
      address: "39 Broadway, 10th Floor, NY 10006",
      phone: "(212) 566-7855",
      hours: "Mon-Fri 9AM-5PM",
      website: "https://www.foodbanknyc.org",
      category: "food",
      description: "Emergency food assistance and meal programs citywide."
    },
    {
      name: "The Legal Aid Society",
      address: "199 Water Street, NY 10038",
      phone: "(212) 577-3300",
      hours: "Mon-Fri 9AM-5PM",
      website: "https://www.legalaidnyc.org",
      category: "legal",
      description: "Free legal representation for immigration and housing."
    }
  ];
  
  const q = (query || '').toLowerCase();
  const filtered = all.filter(s => 
    s.name.toLowerCase().includes(q) ||
    s.category.toLowerCase().includes(q) ||
    s.description.toLowerCase().includes(q)
  );
  
  return filtered.length > 0 ? filtered : all;
}
