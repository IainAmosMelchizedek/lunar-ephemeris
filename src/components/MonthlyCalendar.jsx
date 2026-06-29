import { moonPhaseData } from "../calculations/moonPhase";

export default function MonthlyCalendar({ inputDate, setInputDate }) {
  const selected = new Date(`${inputDate}T12:00:00Z`);
  const year = selected.getUTCFullYear();
  const month = selected.getUTCMonth();

  const firstDay = new Date(Date.UTC(year, month, 1, 12));
  const lastDay = new Date(Date.UTC(year, month + 1, 0, 12));
  const leadingBlanks = firstDay.getUTCDay();

  const days = [];

  for (let i = 0; i < leadingBlanks; i += 1) {
    days.push(null);
  }

  for (let day = 1; day <= lastDay.getUTCDate(); day += 1) {
    const date = new Date(Date.UTC(year, month, day, 12));
    const dateStr = date.toISOString().slice(0, 10);
    days.push({
      date,
      dateStr,
      phase: moonPhaseData(date),
    });
  }

  return (
    <div className="card">
      <div className="section-kicker">Monthly Calendar</div>

      <div className="calendar-title">
        {firstDay.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        })}
      </div>

      <div className="calendar-weekdays">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      <div className="calendar-grid">
        {days.map((item, index) => {
          if (!item) {
            return <div key={`blank-${index}`} className="day-cell day-cell-blank" />;
          }

          const active = item.dateStr === inputDate;

          return (
            <button
              key={item.dateStr}
              type="button"
              className={`day-cell ${active ? "day-cell-active" : ""}`}
              onClick={() => setInputDate(item.dateStr)}
              title={`${item.phase.phaseName} - ${item.phase.illuminationPct}% illuminated`}
            >
              <div className="day-num">{item.date.getUTCDate()}</div>
              <div className="day-emoji">{item.phase.phaseEmoji}</div>
              <div className="day-phase">{item.phase.illuminationPct}%</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}