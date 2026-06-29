export default function MoonSVG({ illumination, isWaxing, phaseName, size = 120 }) {
  const r = size / 2 - 4;
  const cx = size / 2;
  const cy = size / 2;

  if (phaseName === "Full Moon") {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <radialGradient id="fullGlow" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#fffde7" />
            <stop offset="60%" stopColor="#fff9c4" />
            <stop offset="100%" stopColor="#f9a825" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx={cx} cy={cy} r={r + 6} fill="#f9a82520" />
        <circle cx={cx} cy={cy} r={r} fill="url(#fullGlow)" filter="url(#glow)" />
      </svg>
    );
  }

  if (phaseName === "New Moon") {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="#1a1a2e" stroke="#444" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ffffff20" strokeWidth="1" />
      </svg>
    );
  }

  const illum = illumination / 100;
  const ex = r * Math.abs(1 - 2 * illum);
  const terminatorSweep = illum > 0.5 ? 1 : 0;
  const litOnRight = isWaxing;

  const outerArc = `M ${cx} ${cy - r} A ${r} ${r} 0 1 ${litOnRight ? 1 : 0} ${cx} ${cy + r}`;
  const termArc = `A ${ex} ${r} 0 0 ${litOnRight ? terminatorSweep : 1 - terminatorSweep} ${cx} ${cy - r}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id="moonLit" cx={litOnRight ? "65%" : "35%"} cy="35%">
          <stop offset="0%" stopColor="#fffde7" />
          <stop offset="70%" stopColor="#fff59d" />
          <stop offset="100%" stopColor="#f0cc60" />
        </radialGradient>
        <clipPath id="moonClip">
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>

      <circle cx={cx} cy={cy} r={r} fill="#1a1a2e" stroke="#33334a" strokeWidth="1" />
      <path d={`${outerArc} ${termArc} Z`} fill="url(#moonLit)" clipPath="url(#moonClip)" />
    </svg>
  );
}