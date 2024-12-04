export default function Progress({
  index,
  numQuestions,
  points,
  maxPoints,
  answered,
}) {
  return (
    <header className="progress">
      <progress value={index + Number(answered !== null)} max={numQuestions} />
      <p>
        Question{" "}
        <strong>
          {index + 1} / {numQuestions}
        </strong>
      </p>
      <p>
        <strong>
          {points} / {maxPoints}
        </strong>{" "}
        Points
      </p>
      <p></p>
    </header>
  );
}
