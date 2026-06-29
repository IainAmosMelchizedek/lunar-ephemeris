export default function Stat({ label, value, sub }) {
  return (
    <div className="stat-box">
      <div className="stat-label">{label}</div>
      <div className="stat-val">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}