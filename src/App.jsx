import { useState, useRef, useEffect } from "react";
import "./App.css";
import WelcomeScreen from "./components/WelcomeScreen";
import BackgroundVideo from "./components/BackgroundVideo";

function App() {
  const [entered, setEntered] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null); 
  const [phase, setPhase] = useState("FORM"); // FORM -> SUGGESTIONS
  const [reflection, setReflection] = useState("");
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false); // Controls the floating stats view
  
  const videoRef = useRef(null);

  const formattedDate = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  });

  // Persistent localStorage History Engine
  const [history, setHistory] = useState(() => {
    try {
      const saved =
        localStorage.getItem("moodora_history");

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleWelcome = () => {
    setEntered(true);
    setTimeout(() => setShowText(true), 1000);
    setTimeout(() => setShowCards(true), 1800);
  };

  const handleMoodSelect = (moodText) => {
    setSelectedMood(moodText);
    setPhase("FORM"); // Ensure we look at the reflection textarea first
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoaded = () => (video.playbackRate = 0.45);
      video.addEventListener("loadeddata", handleLoaded);
      return () => video.removeEventListener("loadeddata", handleLoaded);
    }
  }, []);

  const getThemeClass = () => {
    if (!selectedMood) return "theme-default";
    return `theme-${selectedMood.toLowerCase()}`;
  };

  // Modern Minimal SVG Icons Array replacing raw emojis
  const moodIcons = {
    Happy: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mood-svg">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeLinecap="round" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeLinecap="round" strokeWidth="3" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeLinecap="round" strokeWidth="3" />
      </svg>
    ),
    Neutral: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mood-svg">
        <circle cx="12" cy="12" r="10" />
        <line x1="8" y1="15" x2="16" y2="15" strokeLinecap="round" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeLinecap="round" strokeWidth="3" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeLinecap="round" strokeWidth="3" />
      </svg>
    ),
    Sad: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mood-svg">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" strokeLinecap="round" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeLinecap="round" strokeWidth="3" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeLinecap="round" strokeWidth="3" />
      </svg>
    ),
    Tired: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mood-svg">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    )
  };

  const moods = [
    { label: "Happy", text: "Happy" },
    { label: "Neutral", text: "Neutral" },
    { label: "Sad", text: "Sad" },
    { label: "Tired", text: "Tired" },
  ];

  const moodSuggestions = {
    Happy: [
      "Sing Dance",
      "Build project",
      "Learn new topic",
      "Solve DSA",
    ],

    Neutral: [
      "Continue current work",
      "Read documentation",
      "Refactor code",
    ],

    Sad: [
      "Take a short walk",
      "Write thoughts",
      "Review existing work",
    ],

    Tired: [
      "Organize files",
      "Update README",
      "Plan tomorrow",
    ],
  };

  return (
    <div className={`app-container ${getThemeClass()}`}>
      
      {/* 1. CONSTANT BACKGROUND VIDEO */}
      <BackgroundVideo
      entered={entered}
      videoRef={videoRef}
    />

      {/* 2. ATMOSPHERIC SHADING */}
      <div className="environment-wash">
        {selectedMood === "Happy" && <div className="happy-sunlight-particles"></div>}
        {selectedMood === "Neutral" && <div className="neutral-cloud-drift"></div>}
        {selectedMood === "Sad" && <div className="sad-light-rain"></div>}
        {selectedMood === "Tired" && (
          <>
            <div className="tired-moon-glow"></div>
            <div className="firefly-particle f1"></div>
            <div className="firefly-particle f2"></div>
          </>
        )}
      </div>
      <div className={`overlay ${entered ? "overlay-dark" : "overlay-light"}`} />

      {/* 3. PERSISTENT CORNER SYMBOL FOR ANALYTICS (Available after entering) */}
      {entered && (
        <button 
          className="corner-analytics-trigger"
          onClick={() => setShowAnalyticsModal(!showAnalyticsModal)}
          title="Mood Analytics"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="20" x2="18" y2="10" strokeLinecap="round" />
            <line x1="12" y1="20" x2="12" y2="4" strokeLinecap="round" />
            <line x1="6" y1="20" x2="6" y2="14" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {/* ANALYTICS POPUP CARD */}
      {showAnalyticsModal && (
        <div className="corner-analytics-card fade-in">
          <h4>Mood Analytics</h4>
          <div className="metrics-bars-container">
            {["Happy", "Neutral", "Sad", "Tired"].map((moodName) => {
              const total = history.length || 1;
              const count = history.filter(item => item.mood === moodName).length;
              const percentage = history.length ? Math.round((count / total) * 100) : 0;

              return (
                <div key={moodName} className="analytics-row">
                  <div className="bar-labels">
                    <span>{moodName}</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="bar-track">
                    <div className={`bar-fill fill-${moodName.toLowerCase()}`} style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FIRST SCREEN: LANDING SPACE */}
      {!entered && (
        <WelcomeScreen
          onWelcome={handleWelcome}
        />
      )}

      {/* MOOD SELECTION CARDS VIEW */}
      {entered && !selectedMood && (
        <>
          <div className={`text-container ${showText ? "fade-in" : "hidden"}`}>
            <h1>How are you feeling today?</h1>

            <div className="date-indicator">
              {formattedDate}
            </div>
            
            <p>Take a moment to check in with yourself</p>
          </div>

          <div className={`mood-grid ${showCards ? "fade-in" : "hidden"}`}>
            {moods.map((mood, index) => (
              <button
                key={index}
                type="button"
                className="mood-card"
                onClick={() => handleMoodSelect(mood.text)}
              >
                <div className="symbol-wrap">
                  {moodIcons[mood.label]}
                </div>

                <p>{mood.text}</p>
              </button>
            ))}
          </div>
        </>
      )}

      {/* INTERACTIVE WORKSPACE: REFLECTION FORM STEP */}
      {selectedMood && phase === "FORM" && (
        <div className="reflection-card fade-in">
          <div className="reflection-header">
            <h2>How are you feeling today?</h2>
            <p>Jot down your current mindset to unlock optimized workflow steps.</p>
          </div>
          <textarea
            className="reflection-textarea"
            placeholder="Write anything on your mind..."
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
          ></textarea>
          <div className="reflection-actions">
            <button className="back-btn" onClick={() => setSelectedMood(null)}>← Back</button>
            <button
              className="save-btn"
              disabled={!reflection.trim()}
              onClick={() => {

                if (!reflection.trim()) {
                  alert("Please write something first.");
                  return;
                }

                const newEntry = {
                  id: Date.now(),
                  mood: selectedMood,
                  text: reflection,
                  date: new Date().toLocaleDateString()
                };

                const updatedHistory = [newEntry, ...history];

                setHistory(updatedHistory);

                localStorage.setItem(
                  "moodora_history",
                  JSON.stringify(updatedHistory)
                );

                setPhase("SUGGESTIONS");
              }}
            >
              Save Reflection ✨
            </button>
          </div>
        </div>
      )}

      {/* INTERACTIVE WORKSPACE: ADAPTIVE SUGGESTIONS STEP */}
      {selectedMood && phase === "SUGGESTIONS" && (
        <div className="dashboard-card fade-in">
          <div className="suggestions-section">
            <h3>Adaptive Focus Suggestions</h3>
            <p className="suggestion-subtext">Optimized activities tailored for your <strong>{selectedMood}</strong> mindset:</p>
            <div className="tasks-deck">
              {moodSuggestions[selectedMood].map((task, idx) => (
                <div key={idx} className="task-action-item">
                  <span className="task-checkbox">✦</span>
                  <p>{task}</p>
                </div>
              ))}
            </div>
          </div>
          <button 
            className="return-sanctuary-btn"
            onClick={() => {
              setSelectedMood(null);
              setReflection("");
              setPhase("FORM");
            }}
          >
            Reset Space
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

