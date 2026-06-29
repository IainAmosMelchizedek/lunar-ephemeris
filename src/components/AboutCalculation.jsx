export default function AboutCalculation() {
  return (
    <div className="card">
      <div className="section-kicker">About</div>

      <h2 className="page-title">About the Calculation</h2>

      <p className="about-paragraph">
        This application uses the <strong>astronomy-engine</strong> library as
        its primary astronomical calculation engine. It computes lunar phase,
        lunar cycle progress, illumination, and upcoming lunar events using
        established astronomical algorithms rather than custom-written
        approximations.
      </p>

      <p className="about-paragraph">
        Additional solar and lunar event calculations such as sunrise, sunset,
        moonrise, and moonset are provided through{" "}
        <strong>suncalc</strong>, while{" "}
        <strong>date-fns</strong> is used for modern date and time handling.
      </p>

      <p className="about-paragraph">
        All calculations are performed locally in your browser. No user data,
        location history, or astronomical calculations are sent to any remote
        server.
      </p>

      <div className="about-list">
        <div>✓ Browser-based calculations</div>
        <div>✓ Works offline (PWA)</div>
        <div>✓ Shareable URLs</div>
        <div>✓ Favorite locations</div>
        <div>✓ Daily lunar summary</div>
        <div>✓ Monthly lunar calendar</div>
      </div>

      <div className="divider" />

      <div className="about-footer">
        Lunar Ephemeris Application
        <br />
        React • Vite • astronomy-engine • SunCalc • date-fns
      </div>
    </div>
  );
}