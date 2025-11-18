interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function callClaude(
  messages: Message[], 
  options?: { system?: string; max_tokens?: number }
): Promise<string> {
  const response = await fetch('/.netlify/functions/anthropic', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages,
      system: options?.system,
      max_tokens: options?.max_tokens || 1024,
    }),
  });

  if (!response.ok) throw new Error('API request failed');
  
  const data = await response.json();
  return data.content
    .filter((item: any) => item.type === 'text')
    .map((item: any) => item.text)
    .join('\n');
}