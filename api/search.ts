import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ 
      error: 'API key not configured',
      usingMockData: true,
      resources: getMockData(req.body.query || '')
    });
  }

  try {
    const { query, location, category, maxDistance } = req.body;

    const locationContext = location 
      ? `User is located at coordinates: ${location.lat}, ${location.lng}. ` 
      : 'User is in New York City area. ';
    
    const categoryContext = category && category !== 'all'
      ? `Focus on ${category} services. `
      : '';

    const distanceContext = maxDistance
      ? `Prioritize services within ${maxDistance} miles. `
      : '';

    const prompt = `${locationContext}${categoryContext}${distanceContext}

Search for social services and community resources related to: "${query}" in New York City area.

Find real, currently operating organizations with accurate contact information. For each resource found, extract:
- Organization name
- Full address with ZIP code
- Phone number
- Hours of operation
- Website URL
- Category (housing, healthcare, legal, employment, education, food, language, mental health, childcare)
- Brief description of services (1-2 sentences)

Format your response as a JSON array ONLY. No other text. Use this exact structure:
[
  {
    "name": "Organization Name",
    "address": "Full address with ZIP",
    "phone": "Phone number",
    "hours": "Hours of operation",
    "website": "Website URL",
    "category": "service category",
    "description": "Brief description"
  }
]

Return ONLY the JSON array, no markdown formatting, no explanations.`;

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
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract text from Gemini response
    let fullText = '';
    if (data.candidates && data.candidates[0]?.content?.parts) {
      fullText = data.candidates[0].content.parts
        .map((part: any) => part.text)
        .join('');
    }

    // Clean and parse JSON
    const cleanText = fullText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    let resources = [];
    try {
      resources = JSON.parse(cleanText);
      if (!Array.isArray(resources)) {
        resources = [resources];
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Received text:', cleanText);
      
      // Fallback to mock data if parsing fails
      resources = getMockData(query);
    }

    return res.status(200).json({
      success: true,
      count: resources.length,
      resources: resources,
      provider: 'gemini'
    });

  } catch (error: any) {
    console.error('Search error:', error);
    
    // Return mock data as fallback
    return res.status(200).json({
      success: true,
      count: 3,
      resources: getMockData(req.body.query || ''),
      provider: 'mock',
      note: 'Using fallback data due to API error'
    });
  }
}

// Mock data fallback
function getMockData(query: string) {
  const queryLower = query.toLowerCase();
  
  const allMockData = [
    {
      name: "NYC Well - Mental Health Support",
      address: "New York, NY (Call, Text, or Chat)",
      phone: "1-888-692-9355",
      hours: "24/7",
      website: "https://nycwell.cityofnewyork.us",
      category: "mental health",
      description: "Free, confidential mental health support via phone, text, or chat. Available 24/7 in over 200 languages."
    },
    {
      name: "NAMI NYC",
      address: "505 8th Avenue, Suite 1902, New York, NY 10018",
      phone: "(212) 684-3264",
      hours: "Mon-Fri 9AM-5PM",
      website: "https://www.naminycmetro.org",
      category: "mental health",
      description: "Mental health support, education programs, peer support groups, and advocacy services."
    },
    {
      name: "Food Bank For New York City",
      address: "39 Broadway, 10th Floor, New York, NY 10006",
      phone: "(212) 566-7855",
      hours: "Mon-Fri 9AM-5PM",
      website: "https://www.foodbanknyc.org",
      category: "food",
      description: "Emergency food assistance, meal programs, and connections to food pantries citywide."
    },
    {
      name: "The Legal Aid Society",
      address: "199 Water Street, New York, NY 10038",
      phone: "(212) 577-3300",
      hours: "Mon-Fri 9AM-5PM",
      website: "https://www.legalaidnyc.org",
      category: "legal",
      description: "Free legal representation for immigration, asylum, deportation defense, and housing matters."
    },
    {
      name: "IRC NYC - Employment Services",
      address: "122 East 42nd Street, New York, NY 10168",
      phone: "(212) 377-4728",
      hours: "Mon-Fri 8AM-5PM",
      website: "https://www.rescue.org",
      category: "employment",
      description: "Job training, resume help, ESL classes, and career counseling for refugees."
    },
    {
      name: "Coalition for the Homeless",
      address: "129 Fulton Street, New York, NY 10038",
      phone: "(212) 776-2000",
      hours: "Mon-Fri 9AM-5PM",
      website: "https://www.coalitionforthehomeless.org",
      category: "housing",
      description: "Emergency shelter placement, eviction prevention, and housing assistance programs."
    },
    {
      name: "NYC Health + Hospitals/Bellevue",
      address: "462 First Avenue, New York, NY 10016",
      phone: "(212) 562-4141",
      hours: "24/7 Emergency Care",
      website: "https://www.nychealthandhospitals.org/bellevue",
      category: "healthcare",
      description: "Full-service hospital with multilingual staff and specialized refugee health program."
    },
    {
      name: "CUNY Adult Literacy Program",
      address: "Multiple CUNY campuses citywide",
      phone: "(212) 650-7925",
      hours: "Varies by location",
      website: "https://www.cuny.edu",
      category: "education",
      description: "Free adult basic education, GED preparation, ESL classes, and college readiness programs."
    },
    {
      name: "Interfaith Center - ESL Classes",
      address: "40 Broad Street, Suite 1600, New York, NY 10004",
      phone: "(212) 870-3510",
      hours: "Mon-Fri 9AM-6PM",
      website: "https://www.interfaithcenter.org",
      category: "language",
      description: "Free ESL classes for all levels and cultural orientation programs."
    },
    {
      name: "NYC Child Care Connect",
      address: "Referral service for citywide programs",
      phone: "(888) 469-5999",
      hours: "Mon-Fri 8AM-6PM",
      website: "https://www.nycchildcareconnect.org",
      category: "childcare",
      description: "Free referrals to licensed childcare programs and subsidy information."
    }
  ];

  // Filter by query
  const filtered = allMockData.filter(service => 
    service.name.toLowerCase().includes(queryLower) ||
    service.category.toLowerCase().includes(queryLower) ||
    service.description.toLowerCase().includes(queryLower)
  );

  return filtered.length > 0 ? filtered.slice(0, 5) : allMockData.slice(0, 3);
}
