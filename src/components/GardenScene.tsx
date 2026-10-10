import { motion, useReducedMotion } from "motion/react";

export function GardenScene({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <svg className={className} viewBox="0 0 400 560" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="g-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8f0e4" />
          <stop offset="55%" stopColor="#e8eef0" />
          <stop offset="100%" stopColor="#d5e4e6" />
        </linearGradient>
        <linearGradient id="g-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dce9eb" />
          <stop offset="100%" stopColor="#c5d8dc" />
        </linearGradient>
        <linearGradient id="g-stone" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#faf6f0" />
          <stop offset="100%" stopColor="#e9dfd2" />
        </linearGradient>
        <radialGradient id="g-glow" cx="50%" cy="28%" r="50%">
          <stop offset="0%" stopColor="#fff8ea" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#fff8ea" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="560" fill="url(#g-sky)" />
      <ellipse cx="200" cy="300" rx="220" ry="80" fill="#c8d8c0" opacity="0.35" />
      <path d="M0 250 Q120 220 200 235 T400 250 V560 H0 Z" fill="url(#g-water)" />
      <path d="M0 268c80 8 140-6 200 4s140 10 200-4" fill="none" stroke="#ffffff" strokeOpacity="0.5" />

      <motion.g
        animate={reduced ? undefined : { y: [0, -2, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="148" cy="318" rx="34" ry="12" fill="#f7f7f5" />
        <path d="M176 308c8-28 26-48 48-38" fill="none" stroke="#f7f7f5" strokeWidth="11" strokeLinecap="round" />
        <circle cx="228" cy="268" r="7" fill="#f7f7f5" />
        <path d="M234 264l10 3-8 5z" fill="#e39a4a" />
        <ellipse cx="252" cy="318" rx="34" ry="12" fill="#f4f4f2" />
        <path d="M224 308c-8-28-26-48-48-38" fill="none" stroke="#f4f4f2" strokeWidth="11" strokeLinecap="round" />
        <circle cx="172" cy="268" r="7" fill="#f4f4f2" />
        <path d="M166 264l-10 3 8 5z" fill="#e39a4a" />
        <ellipse cx="148" cy="332" rx="26" ry="6" fill="#f7f7f5" opacity="0.35" />
        <ellipse cx="252" cy="332" rx="26" ry="6" fill="#f4f4f2" opacity="0.35" />
      </motion.g>

      <path
        fill="url(#g-stone)"
        fillRule="evenodd"
        d="M0 0 H400 V560 H0 Z M36 52 V548 H364 V52 A164 164 0 0 0 36 52 Z"
      />
      <path fill="url(#g-glow)" d="M36 52 V548 H364 V52 A164 164 0 0 0 36 52 Z" />

      <g fill="none" stroke="#d8cbb8" strokeWidth="1.2">
        <path d="M36 52 V548 H364 V52 A164 164 0 0 0 36 52 Z" />
        <path d="M52 68 V532 H348 V68 A148 148 0 0 0 52 68 Z" />
      </g>

      <Column x={52} />
      <Column x={316} flip />

      <g opacity="0.65" fill="none" stroke="#8fa878" strokeWidth="1">
        <path d="M58 90c20-10 32-4 40 10 12-6 26-4 34 10" />
        <path d="M342 90c-20-10-32-4-40 10-12-6-26-4-34 10" />
        <path d="M120 58c40-8 80-8 120 0" />
      </g>

      <RoseCluster x={8} y={380} />
      <RoseCluster x={248} y={380} flip />

      {!reduced ? (
        <>
          <FloatingPetal cx={120} cy={200} delay={0} />
          <FloatingPetal cx={280} cy={180} delay={1.2} />
          <FloatingPetal cx={200} cy={150} delay={2.4} />
        </>
      ) : null}
    </svg>
  );
}

function Column({ x, flip = false }: { x: number; flip?: boolean }) {
  const sx = flip ? -1 : 1;
  const tx = flip ? x + 32 : x;
  return (
    <g transform={`translate(${tx} 68) scale(${sx} 1)`}>
      <rect x="0" y="0" width="32" height="464" fill="#f3ebe2" stroke="#e0d2c4" strokeWidth="1" />
      <rect x="4" y="8" width="24" height="448" fill="none" stroke="#ebe3d8" strokeWidth="1" />
      <path d="M0 0 H32 V18 H0 Z" fill="#f8f3ec" stroke="#e0d2c4" />
      <path d="M0 18 H32 V42 H0 Z" fill="#efe6dc" />
      <ellipse cx="16" cy="10" rx="12" ry="4" fill="#faf6f0" />
    </g>
  );
}

function RoseCluster({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <path d="M40 120c-6-40 4-70-2-100" fill="none" stroke="#6d8a62" strokeWidth="1.4" />
      <ellipse cx="28" cy="88" rx="14" ry="6" fill="#87a872" transform="rotate(-30 28 88)" />
      <ellipse cx="52" cy="72" rx="16" ry="6" fill="#87a872" transform="rotate(20 52 72)" />
      <Rose x={36} y={52} tone="#f6e4ea" deep="#d7a3b0" />
      <Rose x={58} y={68} tone="#8d3044" deep="#5e1a28" />
      <Rose x={22} y={70} tone="#f0d5dc" deep="#c98396" />
      <Rose x={48} y={38} tone="#f6e7ea" deep="#e3b7c2" scale={0.85} />
    </g>
  );
}

function Rose({
  x,
  y,
  tone,
  deep,
  scale = 1,
}: {
  x: number;
  y: number;
  tone: string;
  deep: string;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="6" rx="16" ry="12" fill={deep} />
      <ellipse cx="-12" cy="2" rx="10" ry="8" fill={tone} transform="rotate(-30 -12 2)" />
      <ellipse cx="12" cy="2" rx="10" ry="8" fill={tone} transform="rotate(30 12 2)" />
      <ellipse cx="-6" cy="-8" rx="8" ry="7" fill={tone} />
      <ellipse cx="7" cy="-8" rx="8" ry="7" fill={tone} />
      <circle cx="0" cy="0" r="5" fill={deep} />
    </g>
  );
}

function FloatingPetal({ cx, cy, delay }: { cx: number; cy: number; delay: number }) {
  return (
    <motion.ellipse
      cx={cx}
      cy={cy}
      rx="4"
      ry="7"
      fill="#f8e8ec"
      opacity="0.55"
      animate={{ y: [0, 18, 0], x: [0, 6, 0], opacity: [0.2, 0.6, 0.2] }}
      transition={{ duration: 7, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function TornPaperEdge({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 28" preserveAspectRatio="none" aria-hidden="true">
      <path
        fill="#f7f2ea"
        d="M0 28 L0 10 Q20 2 40 12 T80 8 T120 14 T160 6 T200 12 T240 8 T280 14 T320 6 T360 12 T400 8 L400 28 Z"
      />
    </svg>
  );
}
