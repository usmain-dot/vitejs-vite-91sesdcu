import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader, Sparkles } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  category: string;
  description: string;
  address: string;
  phone: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  services?: number[];
}

interface AISearchProps {
  services: Service[];
  onServiceSelect: (serviceId: number) => void;
}

export default function AISearch({ services, onServiceSelect }: AISearchProps): React.ReactElement {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatServicesForPrompt = (services: Service[]): string => {
    return services
      .map(
        (service) =>
          `- ${service.name} (${service.category}): ${service.description}\n  Address: ${service.address}\n  Phone: ${service.phone}`
      )
      .join('\n\n');
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);

    try {
      const systemPrompt = `You are a helpful assistant for the Bridge app, which connects communities to essential services in New York.

Available services in our database:
${formatServicesForPrompt(services)}

When helping users:
1. First recommend relevant services from our database
2. Be specific about which service to use and why
3. Be empathetic and supportive
4. Keep responses concise and helpful
5. Always mention the service name clearly so I can highlight it`;

      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage },
          ],
          system: systemPrompt,
        }),
      });

      const data = await response.json();
      const assistantMessage = data.content || JSON.stringify(data);

      const mentionedServiceIds = services
        .filter((service) =>
          assistantMessage.toLowerCase().includes(service.name.toLowerCase())
        )
        .map((service) => service.id);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: assistantMessage,
          services: mentionedServiceIds,
        },
      ]);
    } catch (error) {
      console.error('AI Search error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Error: ${
            error instanceof Error ? error.message : 'Something went wrong.'
          }`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ height: '600px', maxHeight: '90vh' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-semibold">AI Search Assistant</h3>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Sparkles className="w-12 h-12 mx-auto mb-3 text-purple-400" />
            <p className="text-sm mb-2">Ask me to help you find services!</p>
            <p className="text-xs text-gray-400">
              Try: "I need mental health services" or "Find housing assistance"
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg p-3 ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>

              {message.services && message.services.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-semibold text-gray-700 mb-1">Services in our database:</p>
                  {message.services.map((serviceId) => {
                    const service = services.find((s) => s.id === serviceId);
                    if (!service) return null;
                    return (
                      <button
                        key={serviceId}
                        onClick={() => onServiceSelect(serviceId)}
                        className="w-full text-left p-2 bg-white rounded border border-gray-200 hover:border-blue-500 transition-colors text-xs"
                      >
                        <div className="font-medium text-gray-900">{service.name}</div>
                        <div className="text-gray-600">{service.category}</div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-2">
              <Loader className="w-5 h-5 animate-spin text-purple-500" />
              <span className="text-sm text-gray-600">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 text-sm"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg px-4 py-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
