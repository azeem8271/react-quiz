function NextButton({ dispatch, answered, index, numQuestions }) {
  if (answered === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "SET_NEXT_QUESTION" })}
      >
        Next
      </button>
    );

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "END_QUIZ" })}
    >
      Finish
    </button>
  );
}

export default NextButton;
