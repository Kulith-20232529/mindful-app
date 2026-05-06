import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const moodEmojis = ['😔', '😟', '😐', '🙂', '😊', '😄', '🤩'];
const moodLabels = ['Very Low', 'Low', 'Okay', 'Good', 'Great', 'Excellent', 'Amazing'];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('moodEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  }, [entries]);

  const saveMood = () => {
    if (selectedMood === null) return;
    const entry = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: selectedMood + 1,
      emoji: moodEmojis[selectedMood],
      note,
      timestamp: Date.now(),
    };
    setEntries(prev => [...prev.slice(-29), entry]);
    setSelectedMood(null);
    setNote('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const chartData = entries.slice(-14);

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>📊 Mood Tracker</h2>
      <p style={{ color: '#888', marginBottom: '2rem', fontSize: '0.9rem' }}>Log your mood daily to spot patterns over time.</p>

      <div style={{ background: '#161b27', border: '1px solid #2a2f3e', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#aaa' }}>How are you feeling right now?</p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {moodEmojis.map((emoji, i) => (
            <button
              key={i}
              onClick={() => setSelectedMood(i)}
              title={moodLabels[i]}
              style={{
                fontSize: '1.8rem',
                background: selectedMood === i ? '#1e2a45' : 'transparent',
                border: selectedMood === i ? '2px solid #7c9ef8' : '2px solid transparent',
                borderRadius: '12px',
                padding: '0.4rem 0.6rem',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {emoji}
            </button>
          ))}
        </div>
        {selectedMood !== null && (
          <p style={{ color: '#7c9ef8', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Feeling: <strong>{moodLabels[selectedMood]}</strong>
          </p>
        )}
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Add a note (optional)..."
          rows={2}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '10px',
            border: '1px solid #2a2f3e',
            background: '#0f1117',
            color: '#e8e8e8',
            fontSize: '0.85rem',
            resize: 'none',
            marginBottom: '1rem',
            outline: 'none',
          }}
        />
        <button
          onClick={saveMood}
          disabled={selectedMood === null}
          style={{
            padding: '0.6rem 1.5rem',
            background: selectedMood !== null ? '#7c9ef8' : '#2a2f3e',
            border: 'none',
            borderRadius: '10px',
            color: selectedMood !== null ? '#fff' : '#555',
            cursor: selectedMood !== null ? 'pointer' : 'default',
            fontWeight: '600',
            fontSize: '0.9rem',
          }}
        >
          {saved ? '✓ Saved!' : 'Log Mood'}
        </button>
      </div>

      {chartData.length > 1 && (
        <div style={{ background: '#161b27', border: '1px solid #2a2f3e', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#aaa' }}>Your mood over the last {chartData.length} entries</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2f3e" />
              <XAxis dataKey="date" stroke="#555" fontSize={11} />
              <YAxis domain={[1, 7]} stroke="#555" fontSize={11} />
              <Tooltip
                contentStyle={{ background: '#1e2a45', border: '1px solid #2a2f3e', borderRadius: '8px' }}
                labelStyle={{ color: '#aaa' }}
              />
              <Line type="monotone" dataKey="mood" stroke="#7c9ef8" strokeWidth={2} dot={{ fill: '#7c9ef8' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {entries.length > 0 && (
        <div style={{ background: '#161b27', border: '1px solid #2a2f3e', borderRadius: '16px', padding: '1.5rem' }}>
          <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#aaa' }}>Recent entries</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[...entries].reverse().slice(0, 5).map((e, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 0', borderBottom: '1px solid #2a2f3e' }}>
                <span style={{ fontSize: '1.5rem' }}>{e.emoji}</span>
                <div>
                  <p style={{ fontSize: '0.85rem', fontWeight: '600' }}>{e.date} — {moodLabels[e.mood - 1]}</p>
                  {e.note && <p style={{ fontSize: '0.8rem', color: '#888' }}>{e.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}