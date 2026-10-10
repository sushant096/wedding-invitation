type PartyAttire = "gown" | "suit" | "tuxedo";

export function Flourish({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 24" aria-hidden="true">
      <path d="M2 12h48M90 12h48" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M70 12c-8-8-16-6-18 0 6 6 12 6 18 0z" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M70 12c8-8 16-6 18 0-6 6-12 6-18 0z" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="70" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function SwanLake() {
  return (
    <svg className="swan-lake" viewBox="0 0 400 190" aria-hidden="true">
      <path d="M0 78c70-28 120 24 200 6 70-16 130-8 200 18v88H0Z" fill="#d5e4e4" />
      <path d="M16 112c48 10 70-12 118 0s78 12 120-2 70-8 130 6" fill="none" stroke="#ffffff" strokeOpacity="0.45" />
      <ellipse cx="112" cy="118" rx="46" ry="18" fill="#f7f7f5" />
      <path d="M146 108c6-34 28-62 58-50" fill="none" stroke="#f7f7f5" strokeWidth="16" strokeLinecap="round" />
      <circle cx="206" cy="56" r="8" fill="#f7f7f5" />
      <path d="M212 52l12 3-9 5z" fill="#e39a4a" />
      <ellipse cx="288" cy="118" rx="46" ry="18" fill="#f4f4f2" />
      <path d="M254 108c-6-34-28-62-58-50" fill="none" stroke="#f4f4f2" strokeWidth="16" strokeLinecap="round" />
      <circle cx="194" cy="56" r="8" fill="#f4f4f2" />
      <path d="M188 52l-12 3 9 5z" fill="#e39a4a" />
      <g opacity="0.28" fill="#f7f7f5">
        <ellipse cx="118" cy="150" rx="34" ry="8" />
        <ellipse cx="282" cy="150" rx="34" ry="8" />
      </g>
    </svg>
  );
}

export function RoseMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <g>
        <ellipse cx="32" cy="34" rx="14" ry="12" fill="#6d2030" />
        <ellipse cx="22" cy="32" rx="9" ry="8" fill="#8a3142" transform="rotate(-28 22 32)" />
        <ellipse cx="42" cy="32" rx="9" ry="8" fill="#8a3142" transform="rotate(28 42 32)" />
        <ellipse cx="26" cy="24" rx="8" ry="7" fill="#a24a5c" transform="rotate(-12 26 24)" />
        <ellipse cx="39" cy="24" rx="8" ry="7" fill="#a24a5c" transform="rotate(12 39 24)" />
        <ellipse cx="32" cy="28" rx="6" ry="5.5" fill="#6a1c2a" />
        <circle cx="32" cy="28" r="2.4" fill="#f3d5da" />
      </g>
    </svg>
  );
}

export function Bouquet({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 180"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <g fill="none" stroke="#6d8a62" strokeWidth="1.4">
        <path d="M40 150c20-30 18-58 8-78" />
        <path d="M70 160c10-36 28-52 46-70" />
        <path d="M108 168c8-28 6-50-8-74" />
        <path d="M150 150c-6-34 8-58 24-78" />
      </g>
      <g fill="#7ea36a">
        <ellipse cx="34" cy="92" rx="14" ry="6" transform="rotate(-40 34 92)" />
        <ellipse cx="58" cy="78" rx="16" ry="6" transform="rotate(-20 58 78)" />
        <ellipse cx="132" cy="70" rx="18" ry="6" transform="rotate(24 132 70)" />
        <ellipse cx="168" cy="96" rx="14" ry="5" transform="rotate(36 168 96)" />
      </g>
      <Rose x={48} y={58} scale={0.9} tone="#f0d5dc" deep="#c98396" />
      <Rose x={96} y={42} scale={1.15} tone="#f6e4ea" deep="#d7a3b0" />
      <Rose x={150} y={64} scale={1} tone="#8d3044" deep="#5e1a28" />
      <Rose x={78} y={96} scale={0.72} tone="#e7b7c3" deep="#a85a6e" />
      <Rose x={128} y={104} scale={0.78} tone="#7a2433" deep="#4c121e" />
    </svg>
  );
}

function Rose({
  x,
  y,
  scale,
  tone,
  deep,
}: {
  x: number;
  y: number;
  scale: number;
  tone: string;
  deep: string;
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

export function CornerSpray({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 180 140"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M10 120c30-10 50-40 70-48 18 20 40 28 78 24" fill="none" stroke="#6f8f62" strokeWidth="1.3" />
      <ellipse cx="46" cy="78" rx="16" ry="6" fill="#87a872" transform="rotate(-30 46 78)" />
      <ellipse cx="88" cy="60" rx="14" ry="5" fill="#87a872" transform="rotate(16 88 60)" />
      <Rose x={36} y={58} scale={0.7} tone="#f3dbe2" deep="#d09aab" />
      <Rose x={78} y={40} scale={0.85} tone="#8d3044" deep="#5c1826" />
      <Rose x={118} y={58} scale={0.62} tone="#f6e7ea" deep="#e3b7c2" />
    </svg>
  );
}

export function VillaArt() {
  return (
    <svg className="villa-art" viewBox="0 0 640 280" role="img" aria-label="Illustrated venue">
      <rect width="640" height="280" fill="#f7f1e8" />
      <ellipse cx="320" cy="250" rx="280" ry="18" fill="#e7d7c4" />
      <path d="M40 168 L70 120 H250 L270 168Z" fill="#d7b48a" />
      <path d="M270 168 L300 118 H520 L560 168Z" fill="#e0c09a" />
      <rect x="70" y="168" width="180" height="78" fill="#f3e6d4" />
      <rect x="300" y="168" width="220" height="78" fill="#f7ecdf" />
      <g fill="#7a2433">
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={`l${i}`} x={82 + i * 20} y={132} width="10" height="16" rx="5" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={`r${i}`} x={318 + i * 22} y={130} width="11" height="16" rx="5" />
        ))}
      </g>
      <g stroke="#c4a27a" fill="#fbf6f0" strokeWidth="2">
        <path d="M96 188 v40 h22 v-40 a11 11 0 0 0-22 0z" />
        <path d="M140 188 v40 h22 v-40 a11 11 0 0 0-22 0z" />
        <path d="M184 188 v40 h22 v-40 a11 11 0 0 0-22 0z" />
        <path d="M330 186 v42 h26 v-42 a13 13 0 0 0-26 0z" />
        <path d="M378 186 v42 h26 v-42 a13 13 0 0 0-26 0z" />
        <path d="M426 186 v42 h26 v-42 a13 13 0 0 0-26 0z" />
        <path d="M474 186 v42 h26 v-42 a13 13 0 0 0-26 0z" />
      </g>
      <path d="M470 150c8 28 8 60 2 92M492 142c10 30 8 64 0 100" fill="none" stroke="#3e5c3a" strokeWidth="3" />
      <ellipse cx="470" cy="132" rx="16" ry="28" fill="#4f6e48" />
      <ellipse cx="494" cy="124" rx="14" ry="26" fill="#3d5a38" />
      <ellipse cx="86" cy="176" rx="28" ry="16" fill="#6d8a58" />
      <ellipse cx="560" cy="180" rx="26" ry="14" fill="#6d8a58" />
      <g fill="#fbf8f3" stroke="#d9c4ae">
        <path d="M120 232 l10-16 h16 l10 16z" />
        <path d="M168 236 l8-14 h14 l8 14z" />
        <path d="M360 236 l10-16 h16 l10 16z" />
        <path d="M410 234 l8-12 h12 l8 12z" />
      </g>
    </svg>
  );
}

export function MapSketch() {
  return (
    <svg className="map-sketch" viewBox="0 0 640 300" role="img" aria-label="Illustrated map">
      <rect width="640" height="300" rx="18" fill="#e7efe6" />
      <path d="M0 40h640M0 110h640M0 190h640M0 260h640" stroke="#f7fbf6" strokeWidth="18" />
      <path d="M80 0v300M180 0v300M300 0v300M430 0v300M540 0v300" stroke="#f7fbf6" strokeWidth="16" />
      <path d="M430 0c30 48 18 90 54 132 28 32 36 78 16 168" fill="none" stroke="#d5e3ef" strokeWidth="28" />
      <path d="M318 78c-20 0-34 16-34 34 0 28 34 74 34 74s34-46 34-74c0-18-14-34-34-34z" fill="#8d3044" />
      <circle cx="318" cy="112" r="8" fill="#fbf6f0" />
    </svg>
  );
}

export function PartyGroup({
  members,
}: {
  members: { attire: PartyAttire; color: string; name: string }[];
}) {
  const gap = 108;
  const width = Math.max(members.length * gap, gap);
  return (
    <svg
      className="party-art"
      viewBox={`0 0 ${width} 280`}
      role="img"
      aria-label="Illustrated wedding party in formal dress"
    >
      {members.map((member, index) => (
        <Figure
          key={`${member.attire}-${index}`}
          x={54 + index * gap}
          attire={member.attire}
          color={member.color}
        />
      ))}
    </svg>
  );
}

function Figure({ x, attire, color }: { x: number; attire: PartyAttire; color: string }) {
  const skin = "#f0c9b0";
  const hair = "#2c241f";
  if (attire === "gown") {
    return (
      <g transform={`translate(${x} 24)`}>
        <ellipse cx="0" cy="236" rx="28" ry="5" fill="#eadfd4" />
        <path d="M0 46c-8 0-14 10-12 18 6 2 18 2 24 0 2-8-4-18-12-18z" fill={hair} />
        <ellipse cx="0" cy="52" rx="11" ry="13" fill={skin} />
        <path d="M-12 48c1-16 23-16 24 0-6 5-18 5-24 0z" fill={hair} />
        <path d="M-4 64h8v10h-8z" fill={skin} />
        <path d="M-22 86c2-16 14-22 22-20 8-2 20 4 22 20l10 150c-8 8-56 8-64 0z" fill={color} />
        <path d="M-8 84c2 12 14 12 16 0" fill={skin} />
        <path d="M-18 96c-12 18-14 40-8 62" fill="none" stroke={skin} strokeWidth="4" strokeLinecap="round" />
      </g>
    );
  }
  return (
    <g transform={`translate(${x} 24)`}>
      <ellipse cx="0" cy="236" rx="26" ry="5" fill="#eadfd4" />
      <path d="M-12 36c0-12 24-14 26 0-4 6-20 6-26 0z" fill={hair} />
      <ellipse cx="0" cy="50" rx="11" ry="13" fill={skin} />
      <path d="M-4 62h8v12h-8z" fill={skin} />
      <path d="M-20 84h40v132c-6 8-34 8-40 0z" fill="#161616" />
      <path d="M-22 86l22 48 22-48v128h-44z" fill={color} />
      <path d="M-2 100h4v96h-4z" fill="#f6f1ea" />
      <path d="M-18 96c-14 16-12 46-4 70" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" />
      <path d="M18 96c14 16 12 46 4 70" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" />
      {attire === "tuxedo" ? <path d="M-7 92l7 9 7-9" fill="none" stroke="#f6f1ea" strokeWidth="2" /> : null}
    </g>
  );
}

export function EmbossPattern() {
  return (
    <svg className="emboss-pattern" viewBox="0 0 200 200" aria-hidden="true">
      <g fill="none" stroke="rgba(255,236,220,0.28)" strokeWidth="1.2">
        <path d="M40 46c8 8 8 16 0 22-8-6-8-14 0-22z" />
        <circle cx="40" cy="52" r="4" />
        <path d="M28 70c10-2 16 8 8 16" />
        <path d="M150 40c10 6 8 18-2 22-8-8-8-18 2-22z" />
        <path d="M132 78c14 4 16 18 4 24" />
        <path d="M70 150c6-12 20-12 26 0-8 6-18 6-26 0z" />
        <path d="M48 160c8 8 20 6 24-4" />
      </g>
    </svg>
  );
}
