import { ICheckbox } from "@/interfaces/components/ICheckbox";

export default function Checkbox({
  label,
  checked = false,
  onChange,
  onClick,
  disabled = false,
}: ICheckbox) {
  return (
    <div className={`checkbox ${disabled ? 'checkbox--disabled' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onClick={onClick}
        onChange={onChange ? (e) => onChange(e.target.checked) : undefined}
        disabled={disabled}
        className="checkbox__input"
      />
      <span className="checkbox__label">{label}</span>
    </div>
  );
}
