import { useState, type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  const [glow, setGlow] = useState(false);

  return (
    <div
      className={`glass-card ${glow ? 'glow-border' : ''} ${className}`.trim()}
      onMouseEnter={() => setGlow(true)}
      onMouseLeave={() => setGlow(false)}
    >
      {children}
    </div>
  );
}
