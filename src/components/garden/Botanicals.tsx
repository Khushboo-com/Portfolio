import { useId } from "react";

export function LotusLeaf({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const id = useId();
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id={`l${id}`} cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="var(--leaf)" />
          <stop offset="60%" stopColor="var(--sage)" />
          <stop offset="100%" stopColor="var(--teal)" />
        </radialGradient>
      </defs>
      <path d="M100 100 L104 8 A92 92 0 1 1 96 8 Z" fill={`url(#l${id})`} opacity="0.9" />
      <g stroke="var(--mint)" strokeWidth="1" opacity="0.45" fill="none">
        {Array.from({ length: 14 }).map((_, i) => {
          const a = ((i * 360) / 14 + 12) * (Math.PI / 180);
          return <path key={i} d={`M100 100 Q${100 + Math.cos(a) * 50} ${100 + Math.sin(a) * 46} ${100 + Math.cos(a) * 88} ${100 + Math.sin(a) * 88}`} />;
        })}
      </g>
      <circle cx="100" cy="100" r="4" fill="var(--mint)" opacity="0.7" />
    </svg>
  );
}

export function LotusFlower({ className = "" }: { className?: string }) {
  const petals = [-60, -35, -12, 12, 35, 60];
  return (
    <svg viewBox="0 0 200 140" className={className} aria-hidden="true">
      {petals.map((r, i) => (
        <path key={i} d="M100 120 C82 90 84 50 100 20 C116 50 118 90 100 120Z"
          transform={`rotate(${r} 100 120)`} fill={i % 2 ? "var(--blush)" : "var(--ivory)"} opacity={0.75} stroke="var(--rose)" strokeWidth="0.6" />
      ))}
      <path d="M100 120 C88 92 90 60 100 38 C110 60 112 92 100 120Z" fill="var(--blush)" />
      <ellipse cx="100" cy="122" rx="30" ry="5" fill="var(--sage)" opacity="0.5" />
    </svg>
  );
}

export function Rose({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const id = useId();
  return (
    <svg viewBox="0 0 200 260" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id={`r${id}`} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="var(--rose-deep)" />
          <stop offset="55%" stopColor="var(--rose)" />
          <stop offset="100%" stopColor="var(--blush)" />
        </radialGradient>
      </defs>
      <path d="M100 150 C98 190 104 220 96 258" stroke="var(--sage)" strokeWidth="3" fill="none" />
      <path d="M99 200 C70 185 60 195 52 210 C72 214 88 210 99 200Z" fill="var(--sage)" opacity="0.85" />
      <path d="M101 225 C128 212 140 218 150 232 C130 238 114 236 101 225Z" fill="var(--sage)" opacity="0.7" />
      <g fill={`url(#r${id})`} stroke="var(--rose-deep)" strokeWidth="0.8" strokeOpacity="0.5">
        <path d="M40 95 C40 50 70 30 100 34 C130 30 160 50 160 95 C160 140 130 160 100 158 C70 160 40 140 40 95Z" />
        <path d="M55 92 C58 62 80 48 102 52 C126 50 146 66 145 95 C140 125 120 140 98 140 C76 138 56 120 55 92Z" opacity="0.95" />
        <path d="M70 90 C72 70 88 62 104 64 C120 66 132 78 130 96 C126 116 112 124 98 124 C82 122 70 108 70 90Z" />
        <path d="M84 88 C86 76 96 72 106 74 C116 78 120 88 116 98 C110 108 100 108 92 104 C86 100 84 94 84 88Z" opacity="0.9" />
        <path d="M96 86 C98 82 104 82 106 86 C108 92 102 96 98 94Z" />
      </g>
    </svg>
  );
}

export function Petal({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden="true">
      <path d="M20 4 C34 10 36 28 20 36 C6 28 6 10 20 4Z" fill="var(--blush)" opacity="0.85" />
      <path d="M20 8 C22 18 22 26 20 34" stroke="var(--rose)" strokeWidth="0.8" fill="none" opacity="0.6" />
    </svg>
  );
}

export function Emblem({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="none" stroke="var(--sage)" strokeWidth="1.2" />
      <path d="M24 38 C14 32 12 20 24 10 C36 20 34 32 24 38Z" fill="var(--sage)" opacity="0.35" />
      <path d="M24 34 C19 30 18 22 24 16 C30 22 29 30 24 34Z" fill="var(--blush)" opacity="0.85" />
      <text x="24" y="28" textAnchor="middle" fontSize="9" fontFamily="Cormorant Garamond, serif" fontWeight="700" fill="var(--ivory)">KV</text>
    </svg>
  );
}

export function Github({ className = "" }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>);
}
export function Linkedin({ className = "" }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>);
}
