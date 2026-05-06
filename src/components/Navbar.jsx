import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageCircle, BarChart2, BookOpen, Wind } from 'lucide-react';

const links = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/chat', icon: MessageCircle, label: 'Chat' },
  { to: '/mood', icon: BarChart2, label: 'Mood' },
  { to: '/journal', icon: BookOpen, label: 'Journal' },
  { to: '/breathing', icon: Wind, label: 'Breathe' },
];

export default function Navbar() {
  return (
    <nav style={{
      width: '200px',
      minHeight: '100vh',
      background: '#161b27',
      borderRight: '1px solid #2a2f3e',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem 1rem',
      gap: '0.5rem',
    }}>
      <div style={{ marginBottom: '2rem', paddingLeft: '0.5rem' }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#7c9ef8' }}>🌿 Mindful</h1>
        <p style={{ fontSize: '0.7rem', color: '#666', marginTop: '2px' }}>your calm companion</p>
      </div>

      {links.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.6rem 0.75rem',
            borderRadius: '10px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: isActive ? '600' : '400',
            color: isActive ? '#7c9ef8' : '#888',
            background: isActive ? '#1e2a45' : 'transparent',
            transition: 'all 0.2s',
          })}
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}