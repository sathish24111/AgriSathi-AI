import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../api/client';
import { MessageSquare, Send, Sparkles, User, Bot, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const AIAssistantPage: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Hello ${user?.name || 'Farmer'}! I am your AgriSathi AI Agricultural Assistant. I have context on your ${user?.primaryCrop || 'Tomato'} crop in ${user?.district || 'Nashik'}. How can I assist your farm today?`,
      timestamp: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || loading) return;

    const userText = inputQuery.trim();
    setInputQuery('');

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await apiClient.askAssistant({
        query: userText,
        crop: user?.primaryCrop || 'Tomato',
        location: user?.district || 'Nashik',
        stage: 'Flowering & Fruiting Stage'
      });

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center space-x-3">
        <div className="p-3 bg-amber-100 text-amber-700 rounded-xl">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">AI Agricultural Assistant</h1>
          <p className="text-xs text-gray-500">Ask agronomic questions with live crop & weather context</p>
        </div>
      </div>

      {/* Suggested Questions Pills */}
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        {[
          'Why are my tomato leaves turning yellow?',
          'What should I do after heavy rain?',
          'How can I prevent Pink Bollworm in cotton?',
          'Recommended organic fertilizer schedule'
        ].map((q, idx) => (
          <button
            key={idx}
            onClick={() => setInputQuery(q)}
            className="bg-white border border-gray-200 px-3 py-1.5 rounded-full text-gray-700 hover:border-agri-primary hover:text-agri-primary transition shadow-sm"
          >
            💡 {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-[480px] flex flex-col justify-between">
        
        <div className="overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`p-2 rounded-xl text-white shrink-0 ${
                msg.sender === 'user' ? 'bg-agri-primary' : 'bg-amber-600'
              }`}>
                {msg.sender === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
              </div>

              <div className={`max-w-lg p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-agri-primary text-white rounded-tr-none'
                  : 'bg-agri-surface text-gray-800 border border-green-100 rounded-tl-none'
              }`}>
                <p>{msg.text}</p>
                <span className={`text-[10px] block mt-1 ${
                  msg.sender === 'user' ? 'text-green-200 text-right' : 'text-gray-400'
                }`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-xl w-fit">
              <RefreshCw className="h-4 w-4 animate-spin text-agri-primary" />
              <span>Agronomist AI is formulating recommendation...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="mt-4 flex items-center space-x-2 pt-3 border-t border-gray-100">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask a question about your crop, disease prevention, or weather..."
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-agri-primary"
          />
          <button
            type="submit"
            disabled={loading || !inputQuery.trim()}
            className="bg-agri-primary text-white p-3 rounded-xl shadow hover:bg-agri-secondary transition disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>

      </div>

    </div>
  );
};
