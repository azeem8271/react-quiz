function FinishScreen({ points, maxPoints, highScore, dispatch }) {
  const percentage = Math.ceil((points / maxPoints) * 100);

  return (
    <>
      <p className="result">
        You Scored <span>{points}</span> out of {maxPoints} ({percentage}%)
      </p>
      <p className="highscore">HighScore: {highScore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "RESTART_QUIZ" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
