function App() {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* VIDEO */}
      <video
        src="/bg.mp4.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* DARK OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.15)",
        }}
      />

      {/* BUTTON */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <button
          style={{
            padding: "18px 60px",
            borderRadius: "60px",
            border: "none",
            background:
              "linear-gradient(to bottom, #c084fc, #7e22ce)",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 0 25px rgba(192,132,252,0.6)",
            backdropFilter: "blur(8px)",
            transition: "0.3s ease",
          }}
        >
          Welcome
        </button>
      </div>
    </div>
  );
}

export default App;