import { useId } from "react";
import { IInput } from "@/interfaces/components/IInput";
import Icons from "./icons";

export default function Input({
  id,
  label,
  placeholder = "",
  type = "text",
  icon,
  value,
  onChange
}: IInput) {
  const generatedId = useId();
  const inputId = id ?? `input-${generatedId}`;

  return (
    <div
      className={
        "input" +
        (label ? " input--with-label" : " input--without-label") +
        (icon ? " input--with-icon" : "")
      }
    >
      {label ? (
        <label className="input__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      {icon ? (
        <div className="input__icon">
          {icon && <Icons name={icon} />}
        </div>
      ) : null}
      <input
        id={inputId}
        className="input__field"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
