import { useId } from "react";
import { ISelect } from "@/interfaces/components/ISelect";
import Icons from "./icons";

export default function Select({
  id,
  label,
  options = [],
  value,
  onChange,
  disabled = false,
  icon,
  className = "",
}: ISelect) {
  const generatedId = useId();
  const selectId = id ?? `select-${generatedId}`;

  return (
    <div
      className={
        "select" +
        (label ? " select--with-label" : " select--without-label") +
        (icon ? " select--with-icon" : "") +
        (className ? ` ${className}` : "")
      }
    >
      {label ? (
        <label className="select__label" htmlFor={selectId}>
          {label}
        </label>
      ) : null}
      {icon ? (
        <div className="select__icon">
          {icon && <Icons name={icon} />}
        </div>
      ) : null}
      <select
        id={selectId}
        className="select__field"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        aria-label={label}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}