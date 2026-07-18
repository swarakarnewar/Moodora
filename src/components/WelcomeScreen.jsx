function WelcomeScreen({ onWelcome }) {
  return (
    <>
      <div className="welcome-text">
        <h1>Moodora</h1>
        <p>A space to pause, reflect, and understand how you feel.</p>
      </div>

      <div className="center-wrapper">
        <button
          onClick={onWelcome}
          className="welcome-btn"
        >
          Welcome
        </button>
      </div>
    </>
  );
}

export default WelcomeScreen;