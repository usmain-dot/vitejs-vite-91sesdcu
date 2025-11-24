// API client for calling Vercel serverless function

export interface SearchParams {
  query: string;
  location?: {
    lat: number;
    lng: number;
  };
  category?: string;
  maxDistance?: number;
}

export interface ServiceResource {
  name: string;
  address: string;
  phone: string;
  hours: string;
  website: string;
  category: string;
  description: string;
}

export interface SearchResponse {
  success: boolean;
  count: number;
  resources: ServiceResource[];
  provider?: string;
  note?: string;
}

export async function searchServices(params: SearchParams): Promise<SearchResponse> {
  try {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
}
