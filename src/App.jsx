import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    console.log("Amount:", amount);
    console.log("From:", fromCurrency);
    console.log("To:", toCurrency);
    fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
      .then(response => response.json())
      .then(data => {
        if (data.result === "success") {

          const rate = data.rates[toCurrency];
          const converted = (amount * rate).toFixed(2);// point after 2 numbr 23.33
          setResult(converted);
        }

      })
      .catch(error => {
        console.log(error);
      })
  }, [amount, fromCurrency, toCurrency]);

  const handleConvert = () => {
    console.log("Convert Button Clicked");
  };

  return (
    <>
      <div className="container">
        <h1>Currency Converter</h1>

        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="select-group">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
            <option value="EUR">EUR</option>
          </select>

          <span> to </span>

          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <button onClick={handleConvert}>Convert</button>

        <div>
          <h2>
            result: {result} {toCurrency}
          </h2>
        </div>
      </div>
    </>
  );
}

export default App;
