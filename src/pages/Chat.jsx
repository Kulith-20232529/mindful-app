import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi 👋 I'm here to listen. How are you feeling today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: `You are a compassionate mental health companion. You listen carefully, respond with empathy, 
          and offer gentle, supportive advice. You are NOT a replacement for professional therapy. 
          If someone is in crisis, always encourage them to contact emergency services or a crisis hotline.
          Keep responses concise, warm, and human. Never be dismissive.`,
          messages: updated.map(m => ({ role: m.role, content: m.content })),
        },
        {
          headers: {
            'x-api-key': process.env.REACT_APP_ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
            'anthropic-dangerous-direct-browser-access': 'true',
          },
        }
      );
      const reply = response.data.content[0].text;
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment."
      }]);
    }
    setLoading(false);
  };

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
      <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem' }}>💬 AI Companion</h2>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
        background: '#161b27',
        borderRadius: '16px',
        border: '1px solid #2a2f3e',
        marginBottom: '1rem',
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
          }}>
            <div style={{
              maxWidth: '75%',
              padding: '0.75rem 1rem',
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: msg.role === 'user' ? '#7c9ef8' : '#1e2a45',
              color: msg.role === 'user' ? '#fff' : '#e8e8e8',
              fontSize: '0.9rem',
              lineHeight: '1.5',
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ color: '#888', fontSize: '0.85rem', paddingLeft: '0.5rem' }}>
            Thinking...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Share how you're feeling..."
          rows={2}
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            border: '1px solid #2a2f3e',
            background: '#161b27',
            color: '#e8e8e8',
            fontSize: '0.9rem',
            resize: 'none',
            outline: 'none',
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: '0 1.25rem',
            background: '#7c9ef8',
            border: 'none',
            borderRadius: '12px',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}