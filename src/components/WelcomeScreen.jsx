function WelcomeScreen({ onWelcome }) {
  return (
    <div className="center-wrapper">
      <button
        onClick={onWelcome}
        className="welcome-btn"
      >
        Welcome
      </button>
    </div>
  );
}

export default WelcomeScreen;
