import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import MonthlyCalendar from "./components/MonthlyCalendar";
import AboutCalculation from "./components/AboutCalculation";
import { moonPhaseData } from "./calculations/moonPhase";
import { formatDate } from "./utils/formatting";
import LocationEvents from "./components/LocationEvents";

const TIME_ZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Oslo",
  "Asia/Tokyo",
];

function getInitialParam(name, fallback) {
  return new URLSearchParams(window.location.search).get(name) || fallback;
}

export default function App() {
  const [view, setView] = useState(() => getInitialParam("view", "dashboard"));
  const [inputDate, setInputDate] = useState(() =>
    getInitialParam("date", new Date().toISOString().slice(0, 10)),
  );
  const [timeZone, setTimeZone] = useState(() =>
    getInitialParam("tz", Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"),
  );
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [copied, setCopied] = useState(false);

  const data = useMemo(() => moonPhaseData(new Date(`${inputDate}T12:00:00Z`)), [inputDate]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("date", inputDate);
    url.searchParams.set("tz", timeZone);
    url.searchParams.set("view", view);
    window.history.replaceState({}, "", url);
  }, [inputDate, timeZone, view]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const copyJson = async () => {
    const payload = {
      date: data.date.toISOString().slice(0, 10),
      phase: data.phaseName,
      emoji: data.phaseEmoji,
      illumination_pct: data.illuminationPct,
      cycle_age_days: data.cycleAgeDays,
      cycle_progress_pct: data.cyclePercent,
      elongation_deg: data.elongationDeg,
      is_waxing: data.isWaxing,
      days_until_new_moon: data.daysUntilNextNew,
      days_until_full_moon: data.daysUntilNextFull,
      next_new_moon_utc: data.nextNewMoon.toISOString(),
      next_full_moon_utc: data.nextFullMoon.toISOString(),
    };

    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const copyShareUrl = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="app-root">
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="app-shell">
        <header className="app-header">
          <div>
            <div className="app-title">Lunar Ephemeris</div>
            <div className="app-subtitle">Moon phase, cycle, calendar, and daily lunar summary</div>
          </div>

          <div className="header-actions">
            <button className="secondary-button" onClick={copyShareUrl}>
              {copied ? "Copied" : "Share"}
            </button>
            <button
              className="secondary-button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </header>

        <nav className="nav-tabs">
          <button className={view === "dashboard" ? "tab active" : "tab"} onClick={() => setView("dashboard")}>
            Dashboard
          </button>
          <button className={view === "calendar" ? "tab active" : "tab"} onClick={() => setView("calendar")}>
            Calendar
          </button>
          <button className={view === "about" ? "tab active" : "tab"} onClick={() => setView("about")}>
            About
          </button>
        </nav>

        <section className="controls">
          <input
            type="date"
            className="control-input"
            value={inputDate}
            onChange={(event) => setInputDate(event.target.value)}
          />

          <select
            className="control-input"
            value={timeZone}
            onChange={(event) => setTimeZone(event.target.value)}
          >
            {TIME_ZONES.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </section>

      {view === "dashboard" && (
  <>
    <Dashboard
      data={data}
      formatDate={(date) => formatDate(date, timeZone)}
      onCopyJson={copyJson}
    />

    <div style={{ height: 16 }} />

    <LocationEvents
      date={data.date}
      timeZone={timeZone}
    />
  </>
)}

        {view === "calendar" && (
          <MonthlyCalendar inputDate={inputDate} setInputDate={setInputDate} />
        )}

        {view === "about" && <AboutCalculation />}
      </div>
    </main>
  );
}