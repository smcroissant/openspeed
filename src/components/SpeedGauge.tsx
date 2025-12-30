'use client';

import { useMemo, useState, useEffect } from 'react';

interface SpeedGaugeProps {
  speed: number;
  maxSpeed?: number;
  label: string;
  unit?: string;
  color?: string;
  isActive?: boolean;
}

export default function SpeedGauge({
  speed,
  maxSpeed = 1000,
  label,
  unit = 'Mbps',
  color = '#06b6d4',
}: SpeedGaugeProps) {
  const [displayedSpeed, setDisplayedSpeed] = useState(speed);
  
  useEffect(() => {
    const diff = speed - displayedSpeed;
    if (Math.abs(diff) < 0.1) {
      setDisplayedSpeed(speed);
      return;
    }
    
    const timer = setTimeout(() => {
      setDisplayedSpeed(prev => prev + diff * 0.25);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [speed, displayedSpeed]);

  const normalizedSpeed = Math.min(displayedSpeed / maxSpeed, 1);
  const circumference = 2 * Math.PI * 110;
  const strokeDashoffset = circumference * (1 - normalizedSpeed * 0.75);

  const tickMarks = useMemo(() => {
    const marks = [];
    const numTicks = 24;
    for (let i = 0; i <= numTicks; i++) {
      const angle = -135 + (i / numTicks) * 270;
      const isMainTick = i % 4 === 0;
      marks.push({ angle, isMainTick, index: i });
    }
    return marks;
  }, []);

  return (
    <div className="relative w-[280px] h-[280px]">
      <svg viewBox="0 0 280 280" className="w-full h-full">
        {/* Tick marks */}
        {tickMarks.map(({ angle, isMainTick, index }) => {
          const radian = (angle * Math.PI) / 180;
          const innerRadius = isMainTick ? 92 : 98;
          const outerRadius = 105;
          const x1 = 140 + innerRadius * Math.cos(radian);
          const y1 = 140 + innerRadius * Math.sin(radian);
          const x2 = 140 + outerRadius * Math.cos(radian);
          const y2 = 140 + outerRadius * Math.sin(radian);

          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isMainTick ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}
              strokeWidth={isMainTick ? 2 : 1}
              strokeLinecap="round"
            />
          );
        })}

        {/* Background arc */}
        <circle
          cx="140"
          cy="140"
          r="110"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.75} ${circumference}`}
          transform="rotate(135 140 140)"
        />

        {/* Progress arc */}
        <circle
          cx="140"
          cy="140"
          r="110"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(135 140 140)"
          style={{
            transition: 'stroke-dashoffset 0.3s ease-out',
            filter: `drop-shadow(0 0 8px ${color}50)`,
          }}
        />

        {/* Center display */}
        <g>
          <text
            x="140"
            y="130"
            textAnchor="middle"
            fill="white"
            style={{ 
              fontSize: '44px', 
              fontWeight: 600,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            {displayedSpeed.toFixed(1)}
          </text>

          <text
            x="140"
            y="158"
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            {unit}
          </text>

          <text
            x="140"
            y="185"
            textAnchor="middle"
            fill={color}
            style={{ 
              fontSize: '11px', 
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </text>
        </g>
      </svg>
    </div>
  );
}
