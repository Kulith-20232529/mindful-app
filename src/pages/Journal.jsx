import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

const prompts = [
  "What's one thing that made you smile today?",
  "What are you grateful for right now?",
  "What's been weighing on your mind lately?",
  "Describe your ideal day. What would it look like?",
  "What's one thing you'd like to let go of?",
  "What did you learn about yourself this week?",
];

export default function Journal() {
  const [entry, setEntry] = useState('');
  const [title, setTitle] = useState('');
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('journalEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const [prompt] = useState(prompts[Math.floor(Math.random() * prompts.length)]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const saveEntry = () => {
    if (!entry.trim()) return;
    const newEntry = {
      id: Date.now(),
      title: title || 'Untitled',
      content: entry,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };
    setEntries(prev => [newEntry, ...prev]);
    setEntry('');
    setTitle('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const deleteEntry = (id) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>📓 Journal</h2>
      <p style={{ color: '#888', marginBottom: '2rem', fontSize: '0.9rem' }}>Write freely. Your entries are stored only on your device.</p>

      <div style={{ background: '#161b27', border: '1px solid #2a2f3e', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.8rem', color: '#7c9ef8', marginBottom: '1rem', fontStyle: 'italic' }}>
          ✨ Prompt: {prompt}
        </p>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Entry title..."
          style={{
            width: '100%',
            padding: '0.6rem 0.75rem',
            borderRadius: '10px',
            border: '1px solid #2a2f3e',
            background: '#0f1117',
            color: '#e8e8e8',
            fontSize: '0.9rem',
            marginBottom: '0.75rem',
            outline: 'none',
          }}
        />
        <textarea
          value={entry}
          onChange={e => setEntry(e.target.value)}
          placeholder="Write your thoughts here..."
          rows={7}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '10px',
            border: '1px solid #2a2f3e',
            background: '#0f1117',
            color: '#e8e8e8',
            fontSize: '0.9rem',
            resize: 'vertical',
            marginBottom: '1rem',
            outline: 'none',
            lineHeight: '1.6',
          }}
        />
        <button
          onClick={saveEntry}
          style={{
            padding: '0.6rem 1.5rem',
            background: '#7c9ef8',
            border: 'none',
            borderRadius: '10px',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
          }}
        >
          {saved ? '✓ Saved!' : 'Save Entry'}
        </button>
      </div>

      {entries.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '0.9rem', color: '#aaa' }}>Previous entries</p>
          {entries.map(e => (
            <div key={e.id} style={{ background: '#161b27', border: '1px solid #2a2f3e', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>{e.title}</p>
                  <p style={{ fontSize: '0.75rem', color: '#666' }}>{e.date}</p>
                </div>
                <button
                  onClick={() => deleteEntry(e.id)}
                  style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', padding: '4px' }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#aaa', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                {e.content.length > 200 ? e.content.slice(0, 200) + '...' : e.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}