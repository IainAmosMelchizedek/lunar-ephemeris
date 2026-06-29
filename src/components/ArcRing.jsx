export default function ArcRing({ percent, radius = 54, stroke = 3, color = "#c8a951", label, sublabel }) {
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);
  const size = (radius + 10) * 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#ffffff0f" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
      {label && (
        <text x={size / 2} y={size / 2 - 4} textAnchor="middle" fill="#e8d5a3" fontSize="13" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="600">
          {label}
        </text>
      )}
      {sublabel && (
        <text x={size / 2} y={size / 2 + 14} textAnchor="middle" fill="#888" fontSize="9" fontFamily="monospace" letterSpacing="1">
          {sublabel}
        </text>
      )}
    </svg>
  );
}