import ArcRing from "./ArcRing";
import MoonSVG from "./MoonSVG";
import Stat from "./Stat";

export default function Dashboard({ data, formatDate, onCopyJson }) {
  const showWaning = data.isWaxing === false;

  return (
    <div className="card">
      <div className="section-kicker">Today&apos;s Moon</div>

      <div className="moon-row">
        <MoonSVG
          illumination={data.illuminationPct}
          isWaxing={data.isWaxing}
          phaseName={data.phaseName}
          size={120}
        />

        <div>
          <div className="phase-name">{data.phaseName}</div>
          <div className="phase-detail">
            {data.isWaxing === true ? "▲ waxing" : data.isWaxing === false ? "▼ waning" : "—"}
          </div>
          <div className="phase-detail">{data.illuminationPct}% illuminated</div>
          <div className="phase-detail">day {data.cycleAgeDays} of cycle</div>
        </div>
      </div>

      <div className="divider" />

      <div className="daily-summary">
        <div className="daily-summary-title">Daily Lunar Summary</div>
        <p>
          The Moon is in the <strong>{data.phaseName}</strong> phase with{" "}
          <strong>{data.illuminationPct}%</strong> illumination. The current lunar cycle is{" "}
          <strong>{data.cyclePercent}%</strong> complete.
        </p>
      </div>

      <div className="rings-row">
        <div className="ring-wrap">
          <ArcRing
            percent={data.cyclePercent}
            radius={46}
            color="#c8a951"
            label={`${data.cyclePercent}%`}
            sublabel="CYCLE"
          />
          <div className="ring-label">lunar cycle</div>
        </div>

        <div className="ring-wrap">
          <ArcRing
            percent={data.illuminationPct}
            radius={46}
            color="#7ba7d4"
            label={`${data.illuminationPct}%`}
            sublabel="LIT"
          />
          <div className="ring-label">illumination</div>
        </div>

        {showWaning && (
          <div className="ring-wrap">
            <ArcRing
              percent={data.waningProgressPct}
              radius={46}
              color="#9e7ac8"
              label={`${data.waningProgressPct}%`}
              sublabel="WANED"
            />
            <div className="ring-label">waning done</div>
          </div>
        )}
      </div>

      {showWaning && (
        <div className="waning-bar">
          <div className="bar-top">
            <span>waning progress</span>
            <span>{data.waningRemainingDays}d until new moon</span>
          </div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${data.waningProgressPct}%` }} />
          </div>
        </div>
      )}

      <div className="stats-grid">
        <Stat label="elongation" value={`${data.elongationDeg}°`} sub="sun-earth-moon angle" />
        <Stat label="cycle age" value={`${data.cycleAgeDays}d`} sub="since last new moon" />
        <Stat label="→ new moon" value={`${data.daysUntilNextNew}d`} sub="waxing begins" />
        <Stat label="→ full moon" value={`${data.daysUntilNextFull}d`} sub="peak illumination" />
      </div>

      <div className="next-box">
        <div className="next-title">Upcoming Transitions</div>

        <div className="next-row">
          <span>🌑 New Moon</span>
          <span>{formatDate(data.nextNewMoon)}</span>
        </div>

        <div className="next-row">
          <span>🌕 Full Moon</span>
          <span>{formatDate(data.nextFullMoon)}</span>
        </div>
      </div>

      <button className="secondary-button full-width" onClick={onCopyJson}>
        Copy JSON
      </button>
    </div>
  );
}