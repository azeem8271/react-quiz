export default function Start({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>We have {numQuestions} questions to test your Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "START_QUIZ" })}
      >
        Let's Start
      </button>
    </div>
  );
}
