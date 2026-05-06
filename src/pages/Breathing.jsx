import React, { useState, useEffect, useRef } from 'react';

const exercises = [
  { name: 'Box Breathing', steps: ['Inhale', 'Hold', 'Exhale', 'Hold'], durations: [4, 4, 4, 4], color: '#7c9ef8', desc: 'Great for focus and calm' },
  { name: '4-7-8 Breathing', steps: ['Inhale', 'Hold', 'Exhale'], durations: [4, 7, 8], color: '#6bcf9e', desc: 'Helps with sleep and anxiety' },
  { name: 'Deep Breathing', steps: ['Inhale', 'Exhale'], durations: [5, 5], color: '#f8a87c', desc: 'Simple stress relief' },
];

export default function Breathing() {
  const [selected, setSelected] = useState(0);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef(null);

  const ex = exercises[selected];

  useEffect(() => {
    if (!running) return;
    setPhase(0);
    setTimeLeft(ex.durations[0]);
  }, [running, selected]);

  useEffect(() => {
    if (!running) {
      clearInterval(intervalRef.current);
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setPhase(p => {
            const next = (p + 1) % ex.steps.length;
            if (next === 0) setCycles(c => c + 1);
            setTimeLeft(ex.durations[next]);
            return next;
          });
          return ex.durations[0];
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, phase, ex]);

  const stop = () => {
    setRunning(false);
    setPhase(0);
    setTimeLeft(0);
    setCycles(0);
    clearInterval(intervalRef.current);
  };

  const totalDuration = ex.durations[phase] || 1;
  const progress = running ? ((totalDuration - timeLeft) / totalDuration) : 0;
  const circleSize = 200;
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>🌬️ Breathing Exercises</h2>
      <p style={{ color: '#888', marginBottom: '2rem', fontSize: '0.9rem' }}>Take a moment to breathe. Even 2 minutes makes a difference.</p>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {exercises.map((e, i) => (
          <button
            key={i}
            onClick={() => { stop(); setSelected(i); }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              border: selected === i ? `2px solid ${e.color}` : '2px solid #2a2f3e',
              background: selected === i ? '#1e2a45' : 'transparent',
              color: selected === i ? '#e8e8e8' : '#888',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: selected === i ? '600' : '400',
            }}
          >
            {e.name}
          </button>
        ))}
      </div>

      <p style={{ color: '#888', fontSize: '0.82rem', marginBottom: '2rem' }}>{ex.desc}</p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <svg width={circleSize} height={circleSize}>
          <circle cx={circleSize / 2} cy={circleSize / 2} r={radius} fill="none" stroke="#2a2f3e" strokeWidth="8" />
          <circle
            cx={circleSize / 2} cy={circleSize / 2} r={radius}
            fill="none" stroke={ex.color} strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
          <text x="50%" y="45%" textAnchor="middle" fill="#e8e8e8" fontSize="22" fontWeight="600" dy=".1em">
            {running ? ex.steps[phase] : '✨'}
          </text>
          <text x="50%" y="62%" textAnchor="middle" fill="#888" fontSize="14" dy=".1em">
            {running ? `${timeLeft}s` : 'Ready'}
          </text>
        </svg>

        {cycles > 0 && <p style={{ color: '#888', fontSize: '0.85rem' }}>Cycles completed: {cycles}</p>}

        <div style={{ display: 'flex', gap: '1rem' }}>
          {!running ? (
            <button
              onClick={() => setRunning(true)}
              style={{
                padding: '0.7rem 2rem',
                background: ex.color,
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              Start
            </button>
          ) : (
            <button
              onClick={stop}
              style={{
                padding: '0.7rem 2rem',
                background: '#2a2f3e',
                border: 'none',
                borderRadius: '12px',
                color: '#e8e8e8',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              Stop
            </button>
          )}
        </div>
      </div>
    </div>
  );
}