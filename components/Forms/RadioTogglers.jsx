export default function RadioTogglers({ options, defaultValue, onChange }) {
  return (
    <div className="flex gap-4">
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name="bgType"
            className=""
            onClick={(ev) => onChange(ev.target.value)}
            defaultChecked={defaultValue === option.value}
            value={option.value}
          />
          <span className="mx-1">{option.label}</span>
        </label>
      ))}
    </div>
  );
}
