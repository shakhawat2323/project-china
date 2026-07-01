"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

type FiberLine = {
  d: string;
  color: string;
  width: number;
  opacity: number;
  delay: string;
  duration: string;
};

type CurrentPacket = {
  path: string;
  color: string;
  delay: string;
  duration: string;
  radius: number;
};

const FIBER_COLORS = ["#38bdf8", "#22d3ee", "#22c55e", "#a855f7", "#facc15", "#ffffff"];

function makeFiberLines(count: number): FiberLine[] {
  return Array.from({ length: count }, (_, index) => {
    const row = index / (count - 1);
    const y = 10 + row * 118;
    const fan = Math.abs(row - 0.5);
    const startX = 10 + Math.sin(index * 0.37) * 4;
    const targetX = 162;
    const targetY = 74 + Math.sin(index * 0.19) * 1.6;
    const c1x = 54 + Math.sin(index * 0.51) * 16;
    const c2x = 102 + Math.cos(index * 0.27) * 19;
    const c1y = y + Math.sin(index * 0.31) * (7 + fan * 18);
    const c2y = targetY + (y - targetY) * 0.2 + Math.cos(index * 0.22) * (4 + fan * 8);
    const color = FIBER_COLORS[index % FIBER_COLORS.length];

    return {
      d: `M ${startX} ${y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${targetX} ${targetY}`,
      color,
      width: index % 11 === 0 ? 0.18 : index % 5 === 0 ? 0.12 : 0.065,
      opacity: index % 13 === 0 ? 0.72 : index % 7 === 0 ? 0.45 : 0.24,
      delay: `${(index % 41) * 0.035}s`,
      duration: `${0.65 + (index % 19) * 0.045}s`,
    };
  });
}

function makeCurrentPackets(count: number): CurrentPacket[] {
  return Array.from({ length: count }, (_, index) => {
    const y = 16 + ((index * 37) % 108);
    const targetY = 74 + Math.sin(index * 0.6) * 2.4;
    const c1x = 58 + Math.sin(index * 0.4) * 14;
    const c2x = 116 + Math.cos(index * 0.3) * 16;
    const color = FIBER_COLORS[(index * 2) % FIBER_COLORS.length];

    return {
      path: `M 6 ${y} C ${c1x} ${y + Math.sin(index) * 12}, ${c2x} ${targetY + Math.cos(index) * 7}, 162 ${targetY}`,
      color,
      delay: `${index * 0.055}s`,
      duration: `${0.75 + (index % 9) * 0.08}s`,
      radius: index % 5 === 0 ? 1.15 : 0.72,
    };
  });
}

export default function SignalFanBeamAnimation() {
  const fiberLines = useMemo(() => makeFiberLines(940), []);
  const currentPackets = useMemo(() => makeCurrentPackets(86), []);

  return (
    <div className="relative h-150 overflow-hidden rounded-lg border border-border bg-white shadow-sm dark:bg-[#07111f]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.03)_1px,transparent_1px)] [background-size:14px_14px] dark:bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.11)_1px,transparent_1px)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.16),transparent_36%),radial-gradient(circle_at_82%_44%,rgba(124,58,237,0.14),transparent_28%)]" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 150" aria-hidden="true">
        <defs>
          <linearGradient id="fiberBeamLine" x1="0" x2="1">
            <stop stopColor="#94a3b8" stopOpacity="0.08" />
            <stop offset="0.58" stopColor="#38bdf8" stopOpacity="0.32" />
            <stop offset="0.86" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ecfeff" stopOpacity="0.18" />
          </linearGradient>
          <radialGradient id="fiberCore" cx="50%" cy="50%" r="50%">
            <stop stopColor="#ffffff" />
            <stop offset="0.38" stopColor="#22d3ee" />
            <stop offset="0.74" stopColor="#2563eb" />
            <stop offset="1" stopColor="#111827" />
          </radialGradient>
          <filter id="fiberGlow" x="-30%" y="-80%" width="170%" height="260%">
            <feGaussianBlur stdDeviation="1.25" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="packetGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#fiberGlow)">
          {fiberLines.map((line, index) => (
            <path
              key={`${line.d}-${index}`}
              d={line.d}
              fill="none"
              stroke={index % 6 === 0 ? line.color : "url(#fiberBeamLine)"}
              strokeWidth={line.width}
              strokeLinecap="round"
              strokeDasharray="0.2 3.4"
              opacity={line.opacity}
            >
              <animate attributeName="stroke-dashoffset" values="0;-18" dur={line.duration} begin={line.delay} repeatCount="indefinite" />
              <animate attributeName="opacity" values={`${line.opacity * 0.45};${Math.min(0.92, line.opacity * 1.9)};${line.opacity * 0.55}`} dur={`${1.05 + (index % 17) * 0.04}s`} begin={line.delay} repeatCount="indefinite" />
            </path>
          ))}
        </g>

        <path
          d="M 5 54 C 45 48, 106 68, 164 73 C 106 80, 45 100, 5 94 Z"
          fill="url(#fiberBeamLine)"
          opacity="0.18"
          filter="url(#packetGlow)"
        >
          <animate attributeName="opacity" values="0.1;0.28;0.12" dur="1.2s" repeatCount="indefinite" />
        </path>

        {currentPackets.map((packet, index) => (
          <g key={`${packet.path}-${index}`}>
            <circle r={packet.radius} fill={packet.color} filter="url(#packetGlow)">
              <animateMotion dur={packet.duration} begin={packet.delay} repeatCount="indefinite" path={packet.path} />
              <animate attributeName="opacity" values="0;1;0" dur={packet.duration} begin={packet.delay} repeatCount="indefinite" />
            </circle>
            {index % 6 === 0 ? (
              <circle r={packet.radius * 2.2} fill="none" stroke={packet.color} strokeWidth="0.24" opacity="0.7">
                <animateMotion dur={packet.duration} begin={packet.delay} repeatCount="indefinite" path={packet.path} />
                <animate attributeName="r" values={`${packet.radius};${packet.radius * 3.4};${packet.radius}`} dur={packet.duration} begin={packet.delay} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.75;0" dur={packet.duration} begin={packet.delay} repeatCount="indefinite" />
              </circle>
            ) : null}
          </g>
        ))}

        <motion.circle cx="162" cy="74" r="2.2" fill="#ecfeff" filter="url(#packetGlow)" animate={{ scale: [0.85, 1.8, 0.9], opacity: [0.55, 1, 0.58] }} transition={{ duration: 0.72, repeat: Infinity }} />
        <path d="M 162 74 H 222" fill="none" stroke="#22d3ee" strokeOpacity="0.75" strokeWidth="0.7" strokeDasharray="2 4">
          <animate attributeName="stroke-dashoffset" values="0;-24" dur="0.62s" repeatCount="indefinite" />
        </path>

        {[18, 27, 38].map((radius, index) => (
          <motion.circle
            key={radius}
            cx="258"
            cy="74"
            r={radius}
            fill="none"
            stroke={index === 1 ? "#22d3ee" : index === 2 ? "#a855f7" : "#3b82f6"}
            strokeOpacity={index === 1 ? "0.62" : "0.36"}
            strokeWidth="0.72"
            strokeDasharray={index === 1 ? "7 8" : "3 10"}
            animate={{ rotate: index % 2 ? 360 : -360, scale: [1, 1.06, 1] }}
            transition={{ rotate: { duration: 3.6 + index, repeat: Infinity, ease: "linear" }, scale: { duration: 1.25, repeat: Infinity } }}
            style={{ transformOrigin: "258px 74px" }}
          />
        ))}

        <motion.circle cx="258" cy="74" r="27" fill="#334155" fillOpacity="0.62" stroke="#94a3b8" strokeWidth="0.7" animate={{ scale: [1, 1.025, 1] }} transition={{ duration: 1.1, repeat: Infinity }} />
        <circle cx="258" cy="74" r="17" fill="#1e293b" fillOpacity="0.88" />
        <circle cx="258" cy="74" r="10" fill="url(#fiberCore)" filter="url(#packetGlow)" />
        <motion.path d="M 258 66 V 75 H 270" fill="none" stroke="#fb923c" strokeWidth="5" strokeLinecap="square" animate={{ opacity: [0.5, 1, 0.55] }} transition={{ duration: 0.6, repeat: Infinity }} />
      </svg>
    </div>
  );
}
