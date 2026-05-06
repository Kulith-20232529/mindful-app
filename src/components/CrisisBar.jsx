import React from 'react';

export default function CrisisBar() {
  return (
    <div style={{
      background: '#1a1f2e',
      borderBottom: '1px solid #2a2f3e',
      padding: '0.4rem 2rem',
      fontSize: '0.75rem',
      color: '#888',
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'center',
    }}>
      <span>🆘 In crisis?</span>
      <a href="tel:988" style={{ color: '#7c9ef8', textDecoration: 'none' }}>988 Suicide & Crisis Lifeline</a>
      <a href="https://www.crisistextline.org" target="_blank" rel="noreferrer" style={{ color: '#7c9ef8', textDecoration: 'none' }}>Crisis Text Line — Text HOME to 741741</a>
    </div>
  );
}