import Options from "./Options";

export default function Question({ question, dispatch, answered }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answered={answered} />
    </div>
  );
}
