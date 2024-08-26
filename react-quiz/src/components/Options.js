export default function Options({ question, dispatch, answer }) {
  function handleAnswer(newAnswer) {
    dispatch({ type: "newAnswer", payload: newAnswer });
  }

  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          onClick={() => handleAnswer(index)}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswered ? (index === question.correctOption ? "correct" : "wrong") : ""}`}
          key={index}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
