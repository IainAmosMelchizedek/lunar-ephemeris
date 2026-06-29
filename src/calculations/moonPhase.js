import * as Astronomy from "astronomy-engine";

const MS_PER_DAY = 86_400_000;

function normalizeDegrees(value) {
  return ((value % 360) + 360) % 360;
}

function phaseNameFromAngle(angle) {
  const el = normalizeDegrees(angle);

  if (el < 22.5 || el >= 337.5) {
    return { phaseName: "New Moon", phaseEmoji: "🌑", isWaxing: null };
  }
  if (el < 67.5) {
    return { phaseName: "Waxing Crescent", phaseEmoji: "🌒", isWaxing: true };
  }
  if (el < 112.5) {
    return { phaseName: "First Quarter", phaseEmoji: "🌓", isWaxing: true };
  }
  if (el < 157.5) {
    return { phaseName: "Waxing Gibbous", phaseEmoji: "🌔", isWaxing: true };
  }
  if (el < 202.5) {
    return { phaseName: "Full Moon", phaseEmoji: "🌕", isWaxing: null };
  }
  if (el < 247.5) {
    return { phaseName: "Waning Gibbous", phaseEmoji: "🌖", isWaxing: false };
  }
  if (el < 292.5) {
    return { phaseName: "Last Quarter", phaseEmoji: "🌗", isWaxing: false };
  }

  return { phaseName: "Waning Crescent", phaseEmoji: "🌘", isWaxing: false };
}

function rounded(value, digits = 1) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function findPreviousNewMoon(date) {
  let probe = Astronomy.SearchMoonPhase(0, date, -40);
  return probe.date;
}

function findNextNewMoon(date) {
  let probe = Astronomy.SearchMoonPhase(0, date, 40);

  if (probe.date <= date) {
    const nextStart = new Date(probe.date.getTime() + MS_PER_DAY);
    probe = Astronomy.SearchMoonPhase(0, nextStart, 40);
  }

  return probe.date;
}

function findNextFullMoon(date) {
  let probe = Astronomy.SearchMoonPhase(180, date, 40);

  if (probe.date <= date) {
    const nextStart = new Date(probe.date.getTime() + MS_PER_DAY);
    probe = Astronomy.SearchMoonPhase(180, nextStart, 40);
  }

  return probe.date;
}

export function moonPhaseData(date = new Date()) {
  const phaseAngle = normalizeDegrees(Astronomy.MoonPhase(date));
  const { phaseName, phaseEmoji, isWaxing } = phaseNameFromAngle(phaseAngle);

  const illumination = (1 - Math.cos((phaseAngle * Math.PI) / 180)) / 2;
  const illuminationPct = rounded(illumination * 100, 1);

  const previousNewMoon = findPreviousNewMoon(date);
  const nextNewMoon = findNextNewMoon(date);
  const nextFullMoon = findNextFullMoon(date);

  const cycleAgeDays = (date - previousNewMoon) / MS_PER_DAY;
  const cycleLengthDays = (nextNewMoon - previousNewMoon) / MS_PER_DAY;
  const cyclePercent = (cycleAgeDays / cycleLengthDays) * 100;

  let waningProgressPct = null;
  let waningRemainingDays = null;

  if (isWaxing === false) {
    const waningStart = new Date(previousNewMoon.getTime() + (cycleLengthDays * MS_PER_DAY) / 2);
    const waningTotalDays = cycleLengthDays / 2;
    const waningElapsedDays = (date - waningStart) / MS_PER_DAY;

    waningProgressPct = Math.max(0, Math.min(100, (waningElapsedDays / waningTotalDays) * 100));
    waningRemainingDays = (nextNewMoon - date) / MS_PER_DAY;
  }

  return {
    date,
    phaseName,
    phaseEmoji,
    isWaxing,
    illuminationPct,
    elongationDeg: rounded(phaseAngle, 1),
    cycleAgeDays: rounded(cycleAgeDays, 1),
    cyclePercent: rounded(cyclePercent, 1),
    daysUntilNextNew: rounded((nextNewMoon - date) / MS_PER_DAY, 1),
    daysUntilNextFull: rounded((nextFullMoon - date) / MS_PER_DAY, 1),
    previousNewMoon,
    nextNewMoon,
    nextFullMoon,
    waningProgressPct: waningProgressPct === null ? null : rounded(waningProgressPct, 1),
    waningRemainingDays: waningRemainingDays === null ? null : rounded(waningRemainingDays, 1),
  };
}