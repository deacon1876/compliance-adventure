import React, { useState } from "react";

export default function GameScreen() {
  // "title" | "episode" | "results"
  const [view, setView] = useState("title");
  const [score, setScore] = useState(0);
  const [topic, setTopic] = useState(null);

  function startEpisode(selectedTopic) {
    setTopic(selectedTopic);
    setScore(0);
    setView("episode");
  }

  function onEpisodeFinished(finalScore) {
    setScore(finalScore);
    setView("results");
  }

  // ✅ Return to main menu (the fix)
  function goToTitle() {
    setTopic(null);
    setScore(0);
    setView("title");
  }

  function restartEpisode() {
    setScore(0);
    setView("episode");
  }

  if (view === "title") {
    return (
      <div className="title-screen">
        <h1>Compliance Training Event (Choose your player)</h1>
        <div className="choices">
      
        </div>
      </div>
    );
  }

  if (view === "episode") {
    return (
      <Episode
        topic={topic}
        onFinish={onEpisodeFinished}
        onCancel={goToTitle}
      />
    );
  }

  // results / ending screen
  return (
    <div className="results">
      <h2>Result — {topic}</h2>
      <p>Score: {score} / 5</p>
      <div className="buttons">

        {/* ✅ no links to other episodes here */}
        <button onClick={goToTitle}>Back to Main Menu</button>
      </div>
    </div>
  );
}

/* Example Episode component shape:
function Episode({ topic, onFinish, onCancel }) {
  // …ask 5 questions…
  // when done:
  // onFinish(finalScore)
  return <div>…</div>
}
*/

