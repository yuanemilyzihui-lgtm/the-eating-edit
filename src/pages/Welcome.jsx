export default function Welcome({ onStart }) {
  return (
    <div className="welcome-page">
      <div className="welcome-logo-wrap">
        <div className="welcome-logo-line">by registered dieticians</div>
        <div className="welcome-logo">Nuri Recipes</div>
        <div className="welcome-leaf">🌿</div>
      </div>

      <p className="welcome-tagline">
        Evidence-based recipes for<br />
        women's health. Curated by<br />
        registered dieticians, for you.
      </p>

      <button className="welcome-cta" onClick={onStart}>
        Find your health focus
      </button>

      <p className="welcome-dietician-note">
        <span>🩺</span>
        All recipes posted by verified RDs only
      </p>

      <div className="welcome-strip" />
    </div>
  )
}
