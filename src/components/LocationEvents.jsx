import { useMemo, useState } from "react";
import * as SunCalc from "suncalc";
import { formatTime } from "../utils/formatting";

export default function LocationEvents({ date, timeZone }) {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("idle");

  const events = useMemo(() => {
    if (!location) return null;

    const sunTimes = SunCalc.getTimes(date, location.latitude, location.longitude);
    const moonTimes = SunCalc.getMoonTimes(date, location.latitude, location.longitude);

    return {
      sunrise: sunTimes.sunrise,
      sunset: sunTimes.sunset,
      moonrise: moonTimes.rise,
      moonset: moonTimes.set,
      alwaysUp: moonTimes.alwaysUp,
      alwaysDown: moonTimes.alwaysDown,
    };
  }, [date, location]);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setStatus("unsupported");
      return;
    }

    setStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setStatus("ready");
      },
      () => {
        setStatus("denied");
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  };

  return (
    <div className="location-box">
      <div className="next-title">Local Sky Events</div>

      {!location && (
        <>
          <p className="location-copy">
            Use your browser location to calculate sunrise, sunset, moonrise, and moonset for the selected date.
          </p>

          <button className="secondary-button full-width" onClick={requestLocation}>
            {status === "loading" ? "Requesting Location..." : "Use My Location"}
          </button>

          {status === "denied" && (
            <div className="location-note">
              Location access was denied. The lunar phase calculator still works without location access.
            </div>
          )}

          {status === "unsupported" && (
            <div className="location-note">
              This browser does not support geolocation.
            </div>
          )}
        </>
      )}

      {location && events && (
        <>
          <div className="location-coords">
            {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </div>

          <div className="event-grid">
            <div className="event-item">
              <span>☀ Sunrise</span>
              <strong>{formatTime(events.sunrise, timeZone)}</strong>
            </div>

            <div className="event-item">
              <span>☀ Sunset</span>
              <strong>{formatTime(events.sunset, timeZone)}</strong>
            </div>

            <div className="event-item">
              <span>⬆ Moonrise</span>
              <strong>
                {events.alwaysUp
                  ? "Always up"
                  : events.alwaysDown
                    ? "Always down"
                    : events.moonrise
                      ? formatTime(events.moonrise, timeZone)
                      : "No rise"}
              </strong>
            </div>

            <div className="event-item">
              <span>⬇ Moonset</span>
              <strong>
                {events.alwaysUp
                  ? "Always up"
                  : events.alwaysDown
                    ? "Always down"
                    : events.moonset
                      ? formatTime(events.moonset, timeZone)
                      : "No set"}
              </strong>
            </div>
          </div>
        </>
      )}
    </div>
  );
}