import { useState } from "react";
import "./index.css";
function App() {
  return <Counter />;
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(1);

  function handleDecreaseStep() {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  }

  function handleIncreaseStep() {
    setStep((s) => s + 1);
  }

  function handleDecreaseCount() {
    setCount(count - step);
  }

  function handleIncreaseCount() {
    setCount(count + step);
  }
  const date = new Date("21 june 2027");
  date.setDate(date.getDate() + count);
  return (
    <div className="app">
      <button onClick={handleDecreaseStep}>-</button>
      <span> Step {step} </span>
      <button onClick={handleIncreaseStep}>+</button>
      <br></br>

      <button onClick={handleDecreaseCount}>-</button>
      <span> Count {count} </span>
      <button onClick={handleIncreaseCount}>+</button>
      <p>
        <span>
          {count === 0
            ? "Today is "
            : count > 0
            ? `${count} days from today will be `
            : `${Math.abs(count)} days ago was`}
        </span>
        {date.toDateString()}
      </p>
    </div>
  );
}

export default App;
