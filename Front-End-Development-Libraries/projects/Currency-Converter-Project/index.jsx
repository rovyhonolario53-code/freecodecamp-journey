const { useState, useMemo } = React;

const conversionValue = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 156.7
};

export function CurrencyConverter() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  const base = useMemo(() => {
    return Number(amount) / conversionValue[from];
  }, [amount, from]);

  const converted = `${(base * conversionValue[to]).toFixed(2)} ${to}`;

  return (
    <div id="card-container">
      <div className="field">
        <label>From</label>
        <select value={from} onChange={e => setFrom(e.target.value)}>
          <option>USD</option>
          <option>EUR</option>
          <option>GBP</option>
          <option>JPY</option>
        </select>
      </div>

      <div className="field">
        <label>To</label>
        <select value={to} onChange={e => setTo(e.target.value)}>
          <option>USD</option>
          <option>EUR</option>
          <option>GBP</option>
          <option>JPY</option>
        </select>
      </div>

      <div className="field">
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>

      <div className="result">{converted}</div>
    </div>
  );
}