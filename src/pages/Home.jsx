import React from 'react';
import { useNavigate } from 'react-router-dom';

const cards = [
  { emoji: '💬', title: 'AI Chat', desc: 'Talk to your calm companion anytime', path: '/chat', color: '#1e2a45' },
  { emoji: '📊', title: 'Mood Tracker', desc: 'Log and visualize your mood trends', path: '/mood', color: '#1a2e25' },
  { emoji: '📓', title: 'Journal', desc: 'Reflect and write your thoughts', path: '/journal', color: '#2a2215' },
  { emoji: '🌬️', title: 'Breathing', desc: 'Calm your nervous system', path: '/breathing', color: '#1e1a2e' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>
        Good day 🌿
      </h2>
      <p style={{ color: '#888', marginBottom: '2.5rem' }}>
        How are you feeling today? Choose something to get started.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
      }}>
        {cards.map(({ emoji, title, desc, path, color }) => (
          <div
            key={path}
            onClick={() => navigate(path)}
            style={{
              background: color,
              border: '1px solid #2a2f3e',
              borderRadius: '16px',
              padding: '1.5rem',
              cursor: 'pointer',
              transition: 'transform 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = '#7c9ef8';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#2a2f3e';
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{emoji}</div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.4rem' }}>{title}</h3>
            <p style={{ fontSize: '0.82rem', color: '#888' }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}