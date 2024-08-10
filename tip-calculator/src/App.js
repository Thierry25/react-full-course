import { useState } from "react";
import "./index.css";
export default function App() {
  const [bill, setBill] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [friendTipPercentage, setFriendTipPercentage] = useState(0);

  function handleReset() {
    setBill(0);
    setTipPercentage(0);
    setFriendTipPercentage(0);
  }

  return (
    <div className="App">
      <BillInput bill={bill} onSetBill={setBill} />
      <TipPercentage
        tipPercentage={tipPercentage}
        onSetPercentage={setTipPercentage}
      >
        How did you like the service?
      </TipPercentage>
      <TipPercentage
        tipPercentage={friendTipPercentage}
        onSetPercentage={setFriendTipPercentage}
      >
        How did your friend like the service?
      </TipPercentage>
      <Total
        bill={bill}
        tipPercentage={tipPercentage}
        friendTipPercentage={friendTipPercentage}
      />
      <Reset
        bill={bill}
        tipPercentage={tipPercentage}
        friendTipPercentage={friendTipPercentage}
        onReset={handleReset}
      />
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <span>How much was the bill? </span>
      <span>
        <input
          type="text"
          value={bill}
          onChange={(e) => onSetBill(Number(e.target.value))}
        />
      </span>
    </div>
  );
}

function TipPercentage({ tipPercentage, onSetPercentage, children }) {
  return (
    <div>
      <span>{children}</span>
      <select
        name="tipPercentage"
        value={tipPercentage}
        onChange={(e) => onSetPercentage(Number(e.target.value))}
      >
        <option value={0}>Dissatisfied</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Total({ bill, tipPercentage, friendTipPercentage }) {
  if (bill === 0) return;

  const totalPercentage = (tipPercentage + friendTipPercentage) / 2 / 100;
  const totalTip = bill * totalPercentage;
  const total = bill + totalTip;
  return (
    <h3>
      You pay {total} (${bill} + ${totalTip} tip)
    </h3>
  );
}

function Reset({ bill, tipPercentage, friendTipPercentage, onReset }) {
  if (bill === 0 && tipPercentage === 0 && friendTipPercentage == 0) return;

  return <button onClick={onReset}>Reset</button>;
}
