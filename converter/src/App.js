// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import React, { useState, useEffect } from "react";

export default function App() {
  const [valueToConvert, setValueToConvert] = useState(100);
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("EUR");

  const [convertedValue, setConvertedValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convertValue() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${valueToConvert}&from=${convertFrom}&to=${convertTo}`
          );
          if (!res.ok) {
            throw new Error("Invalid Data passed");
          }
          const data = await res.json();

          if (!data || !data.rates) {
            throw new Error("Invalid Data passed");
          }
          console.log(data.rates[convertTo]);
          setConvertedValue(data.rates[convertTo]);
          setIsLoading(false);
        } catch (error) {
          setConvertedValue("Invalid data passed");
          setIsLoading(false);
        }
      }

      if (convertFrom === convertTo) {
        setConvertedValue(valueToConvert);
      } else {
        convertValue();
      }
    },
    [valueToConvert, convertFrom, convertTo]
  );
  return (
    <div className="App">
      <input
        type="text"
        value={valueToConvert}
        onChange={(e) => setValueToConvert(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={convertFrom}
        onChange={(e) => setConvertFrom(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={convertTo}
        onChange={(e) => setConvertTo(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{convertedValue}</p>
    </div>
  );
}
