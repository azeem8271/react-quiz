export default function Options({ question, dispatch, answered }) {
  const hasAnswered = answered !== null;

  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${i === answered ? "answer" : ""} ${
            hasAnswered
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "SET_ANSWER", payload: i })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
