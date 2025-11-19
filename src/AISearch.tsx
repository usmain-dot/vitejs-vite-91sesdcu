// src/AISearch.tsx - StackBlitz Version with Web Search
// ⚠️ WARNING: This version is ONLY for testing in StackBlitz
// DO NOT use this in production - it exposes API keys!
import { callClaude } from './utils/anthropicApi';
import React, { useState, useRef, useEffect } from 'react';
import {  X, Send, Loader, Sparkles, AlertTriangle, Settings } from 'lucide-react';

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
  webResults?: WebSearchResult[];
}

interface WebSearchResult {
  title: string;
  url: string;
  description: string;
}

interface AISearchProps {
  services: Service[];
  onServiceSelect: (serviceId: number) => void;
  language: string;
}

export default function AISearch({ services, onServiceSelect, language: _language }: AISearchProps) {  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [anthropicKey, setAnthropicKey] = useState('');
  const [enableWebSearch, setEnableWebSearch] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatServicesForPrompt = (services: Service[]): string => {
    return services.map(service => 
      `- ${service.name} (${service.category}): ${service.description}\n  Address: ${service.address}\n  Phone: ${service.phone}`
    ).join('\n\n');
  };

  // Web search function
  const searchWeb = async (query: string): Promise<WebSearchResult[]> => {
    if (!braveKey || !enableWebSearch) return [];

    try {
      const response = await fetch(
        `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=3`,
        {
          headers: {
            'Accept': 'application/json',
            'X-Subscription-Token': braveKey,
          },
        }
      );

      if (!response.ok) {
        console.error('Brave Search API error:', response.status);
        return [];
      }

      const data = await response.json();
      return (data.web?.results || []).slice(0, 3).map((result: any) => ({
        title: result.title,
        url: result.url,
        description: result.description || '',
      }));
    } catch (error) {
      console.error('Web search error:', error);
      return [];
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    if (!anthropicKey) {
      alert('Please enter your Anthropic API key first!');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      // Perform web search if enabled
      let webResults: WebSearchResult[] = [];
      let webSearchContext = '';
      
      if (enableWebSearch && braveKey) {
        const searchQuery = `${userMessage} social services New York`;
        webResults = await searchWeb(searchQuery);
        
        if (webResults.length > 0) {
          webSearchContext = `\n\nAdditional web resources found:\n${webResults.map(r => 
            `- ${r.title}: ${r.description} (${r.url})`
          ).join('\n')}`;
        }
      }

      const systemPrompt = `You are a helpful assistant for the Bridge app, which connects communities to essential services in New York.

Available services in our database:
${formatServicesForPrompt(services)}
${webSearchContext}

When helping users:
1. First recommend relevant services from our database
2. If web search results are available, mention them as additional resources
3. Be specific about which service to use and why
4. Be empathetic and supportive
5. Keep responses concise and helpful
6. Always mention the service name clearly so I can highlight it`;

      // Call Claude API
      const assistantMessage = await callClaude(
        [
          ...messages.map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content: userMessage }
        ],
        {
          system: systemPrompt,
          max_tokens: 1024,
        }
      );
      
      const mentionedServiceIds = services
        .filter(service => assistantMessage.toLowerCase().includes(service.name.toLowerCase()))
        .map(service => service.id);
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: assistantMessage,
        services: mentionedServiceIds
      }]);
    } catch (error) {
      console.error('AI Search error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error: ${error instanceof Error ? error.message : 'Something went wrong. Please check your API keys and try again.'}`
      }]);
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

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
        title="AI Search Assistant"
      >
        <Sparkles className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ height: '600px', maxHeight: '90vh' }}>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-semibold">AI Search Assistant</h3>
        </div>
        <div className="flex items-center gap-2">
          {!showApiKeyInput && (
            <button
              onClick={() => setShowApiKeyInput(true)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* API Key Configuration */}
      {showApiKeyInput && (
        <div className="p-4 bg-yellow-50 border-b border-yellow-200 max-h-[70vh] overflow-y-auto">
          <div className="flex items-start gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-yellow-800 mb-1">⚠️ Testing Mode Only</p>
              <p className="text-yellow-700 text-xs mb-2">
                This exposes your API keys in the browser. Only use for testing in StackBlitz!
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Anthropic API Key */}
            <div>
              <label className="text-xs font-medium text-gray-700 flex items-center gap-2">
                <span className="text-red-500">*</span> Anthropic API Key (Required):
              </label>
              <input
                type="password"
                value={anthropicKey}
                onChange={(e) => setAnthropicKey(e.target.value)}
                placeholder="sk-ant-..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
              />
              <p className="text-xs text-gray-600 mt-1">
                Get from: <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">console.anthropic.com</a>
              </p>
            </div>

            {/* Brave Search API Key */}
            <div>
              <label className="text-xs font-medium text-gray-700 flex items-center gap-2">
                Brave Search API Key (Optional for web search):
              </label>
              <input
                type="password"
                value={braveKey}
                onChange={(e) => setBraveKey(e.target.value)}
                placeholder="BSA..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
              />
              <p className="text-xs text-gray-600 mt-1">
                Get FREE key (2,000/month): <a href="https://brave.com/search/api/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">brave.com/search/api</a>
              </p>
            </div>

            {/* Enable Web Search Toggle */}

          </div>
        </div>
      )}

      {!showApiKeyInput && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <Sparkles className="w-12 h-12 mx-auto mb-3 text-purple-400" />
                <p className="text-sm mb-2">Ask me to help you find services!</p>
                <p className="text-xs text-gray-400">
                  Try: "I need mental health services" or "Find housing assistance"
                </p>
                {enableWebSearch && (
                  <p className="text-xs text-green-600 mt-2">
                    ✓ Web search enabled
                  </p>
                )}
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  
                  {/* Show mentioned services */}
                  {message.services && message.services.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs font-semibold text-gray-700 mb-1">Services in our database:</p>
                      {message.services.map(serviceId => {
                        const service = services.find(s => s.id === serviceId);
                        if (!service) return null;
                        return (
                          <button
                            key={serviceId}
                            onClick={() => {
                              onServiceSelect(serviceId);
                              setIsOpen(false);
                            }}
                            className="w-full text-left p-2 bg-white rounded border border-gray-200 hover:border-blue-500 transition-colors text-xs"
                          >
                            <div className="font-medium text-gray-900">{service.name}</div>
                            <div className="text-gray-600">{service.category}</div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Show web search results */}
                  {message.webResults && message.webResults.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs font-semibold text-gray-700 mb-1">Additional web resources:</p>
                      {message.webResults.map((result, idx) => (
                        <a
                          key={idx}
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-2 bg-white rounded border border-gray-200 hover:border-green-500 transition-colors text-xs"
                        >
                          <div className="font-medium text-gray-900 hover:text-green-600">{result.title}</div>
                          <div className="text-gray-600 text-xs mt-1">{result.description}</div>
                          <div className="text-blue-600 text-xs mt-1 truncate">{result.url}</div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-2">
                  <Loader className="w-5 h-5 animate-spin text-purple-500" />
                  <span className="text-sm text-gray-600">
                    {enableWebSearch ? 'Searching web and analyzing...' : 'Thinking...'}
                  </span>
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
        </>
      )}
    </div>
  );
}