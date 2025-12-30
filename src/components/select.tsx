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
        "select-wrapper" +
        (label ? " with-label-wrapper" : " without-label-wrapper")
      }
    >
      {label ? (
        <label className="select-label" htmlFor={selectId}>
          {label}
        </label>
      ) : null}
      {icon ? (
        <div
          className={"select-icon" + (label ? " with-label" : " without-label")}
        >
          {icon && <Icons name={icon} />}
        </div>
      ) : null}
      <select
        id={selectId}
        className={`select-base ${icon ? "with-icon" : ""} ${className}`}
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