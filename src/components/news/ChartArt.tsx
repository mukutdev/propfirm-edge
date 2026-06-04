type Props = { seed?: number; className?: string };

export function ChartArt({ seed = 1, className }: Props) {
  const points = Array.from({ length: 20 }, (_, i) => {
    const x = (i / 19) * 100;
    const noise = Math.sin(i * 0.7 + seed) * 12 + Math.cos(i * 0.3 + seed * 2) * 8;
    const y = 55 + noise;
    return `${x},${y}`;
  }).join(" ");
  const id = `g${seed}`;
  return (
    <div className={"relative h-full w-full overflow-hidden bg-gradient-to-br from-[#0d0d14] via-[#141420] to-[#1a0e1f] " + (className ?? "")}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id={`${id}-f`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,100 ${points} 100,100`} fill={`url(#${id}-f)`} />
        <polyline points={points} fill="none" stroke={`url(#${id})`} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <g stroke="#ffffff10" strokeWidth="0.2">
          {[20, 40, 60, 80].map((y) => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} />
          ))}
        </g>
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
    </div>
  );
}