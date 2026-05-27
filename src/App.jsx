import { useState, useRef, useEffect } from "react";

function App() {
  const [entered, setEntered] = useState(false);
  const videoRef = useRef(null);
  const [showText, setShowText] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const handleWelcome = () => {
    setEntered(true);

    setTimeout(() => {
      setShowText(true);
    }, 1000);

    setTimeout(() => {
      setShowCards(true);
    }, 1800);
  };
  useEffect(() => {
  const video = videoRef.current;

  if (video) {
    const handleLoaded = () => {
      video.playbackRate = 0.45;
    };

    video.addEventListener("loadeddata", handleLoaded);

    return () => {
      video.removeEventListener("loadeddata", handleLoaded);
    };
  }
}, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        fontFamily: "Arial",
      }}
    >
      {/* VIDEO BACKGROUND */}
      <video
        src="/bg.mp4.mp4"
        autoPlay
        muted
        loop
        playsInline
        playbackRate={0.6}
        ref={videoRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          transition: "1.5s ease",
          filter: entered
            ? "blur(3px) brightness(0.72)"
            : "blur(0px) brightness(1)",
        }}
      />

      {/* DARK OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: entered
            ? "linear-gradient(to bottom, rgba(20,20,35,0.22), rgba(25,15,40,0.18))"
            : "rgba(0,0,0,0.12)",
          transition: "1.5s ease",
        }}
      />

      {/* FIRST SCREEN */}
      {!entered && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <button
            onClick={handleWelcome}
            style={{
              padding: "18px 60px",
              borderRadius: "60px",
              border: "1px solid rgba(255,255,255,0.25)",
              background:
                "linear-gradient(to bottom, rgba(192,132,252,0.85), rgba(126,34,206,0.82))",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 0 30px rgba(192,132,252,0.45)",
              backdropFilter: "blur(10px)",
              transition: "0.3s ease",
            }}
          >
            Welcome
          </button>
        </div>
      )}

      {/* SECOND SCREEN CONTENT */}
      {entered && (
        <>
          {/* TEXT */}
          <div
            style={{
              position: "absolute",
              top: "18%",
              width: "100%",
              textAlign: "center",
              opacity: showText ? 1 : 0,
              transition: "1.5s ease",
            }}
          >
            <h1
              style={{
                color: "white",
                fontSize: "48px",
                fontWeight: "600",
                letterSpacing: "1px",
                textShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              How are you feeling today?
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                marginTop: "12px",
                fontSize: "18px",
                letterSpacing: "0.5px",
              }}
            >
              Moodora adapts with your emotions ✨
            </p>
          </div>

          {/* MOOD BUTTONS */}
          <div
            style={{
              position: "absolute",
              bottom: "65px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "22px",
              opacity: showCards ? 1 : 0,
              transition: "1.5s ease",
            }}
          >
            {[
              { emoji: "🌞", text: "Happy" },
              { emoji: "☁️", text: "Neutral" },
              { emoji: "🌧️", text: "Sad" },
              { emoji: "😴", text: "Tired" },
            ].map((mood, index) => (
              <div
                key={index}
                style={{
                  width: "135px",
                  height: "150px",
                  borderRadius: "30px",
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.18)",
                  transition: "0.3s ease",
                }}
              >
                <div style={{ fontSize: "46px" }}>
                  {mood.emoji}
                </div>

                <p
                  style={{
                    color: "white",
                    marginTop: "12px",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  {mood.text}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;