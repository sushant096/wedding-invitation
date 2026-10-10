type WaxSealProps = {
  initials: string;
  tone?: "ivory" | "burgundy";
  label?: string;
  className?: string;
};

function scallopPath(cx: number, cy: number, radius: number, bumps: number): string {
  const steps = bumps * 2;
  const points: string[] = [];
  for (let i = 0; i < steps; i += 1) {
    const angle = (i / steps) * Math.PI * 2 - Math.PI / 2;
    const rad = i % 2 === 0 ? radius : radius * 0.9;
    points.push(`${cx + Math.cos(angle) * rad},${cy + Math.sin(angle) * rad}`);
  }
  return `M ${points.join(" L ")} Z`;
}

export function WaxSeal({ initials, tone = "ivory", label, className }: WaxSealProps) {
  const ivory = tone === "ivory";
  const face = ivory ? "#f6f1e8" : "#7a1c2c";
  const rim = ivory ? "#e7dccb" : "#5c1220";
  const ink = ivory ? "#7a6248" : "#f3e6c4";
  const gloss = ivory ? "rgba(255,255,255,0.7)" : "rgba(255,220,210,0.35)";
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <defs>
        <radialGradient id={ivory ? "seal-ivory" : "seal-wine"} cx="38%" cy="32%" r="70%">
          <stop offset="0" stopColor={ivory ? "#fffaf3" : "#a33a4c"} />
          <stop offset="0.55" stopColor={face} />
          <stop offset="1" stopColor={rim} />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="108" rx="28" ry="6" fill="rgba(0,0,0,0.28)" />
      <path d={scallopPath(60, 58, 46, 16)} fill={ivory ? "url(#seal-ivory)" : "url(#seal-wine)"} />
      <path d={scallopPath(60, 58, 34, 16)} fill="none" stroke={ink} strokeOpacity="0.45" strokeWidth="1.2" />
      <ellipse cx="48" cy="42" rx="14" ry="8" fill={gloss} />
      <text
        x="60"
        y={initials.length > 3 ? 64 : 66}
        textAnchor="middle"
        fill={ink}
        fontFamily='"Pinyon Script", cursive'
        fontSize={initials.length > 3 ? 18 : 26}
      >
        {initials}
      </text>
    </svg>
  );
}
