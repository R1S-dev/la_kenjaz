export default function NumberControl({
  id,
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  number,
}) {
  const change = (delta) =>
    onChange(
      Math.max(
        min,
        Math.min(max, Math.round((Number(value) + delta) * 10) / 10),
      ),
    );
  return (
    <div className="number-field">
      <div className="field-title">
        <span className="field-number">{number}</span>
        <div>
          <label htmlFor={id}>{label}</label>
          <p>{hint}</p>
        </div>
      </div>
      <div className="number-row">
        <button
          type="button"
          className="stepper"
          aria-label={`Smanji: ${label}`}
          disabled={value <= min}
          onClick={() => change(-step)}
        >
          −
        </button>
        <div className="number-value">
          <input
            id={id}
            type="number"
            inputMode={step === 1 ? "numeric" : "decimal"}
            min={min}
            max={max}
            step={step}
            value={value}
            aria-describedby={`${id}-unit`}
            onChange={(e) =>
              onChange(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
          <span id={`${id}-unit`}>{unit}</span>
        </div>
        <button
          type="button"
          className="stepper"
          aria-label={`Povećaj: ${label}`}
          disabled={value >= max}
          onClick={() => change(step)}
        >
          +
        </button>
      </div>
    </div>
  );
}
