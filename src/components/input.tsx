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
        "input-wrapper" +
        (label ? " with-label-wrapper" : " without-label-wrapper")
      }
    >
      {label ? (
        <label className="input-label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      {icon ? (
        <div
          className={"input-icon" + (label ? " with-label" : " without-label")}
        >
          {icon && <Icons name={icon} />}
        </div>
      ) : null}
      <input
        id={inputId}
        className={"input-base" + (icon ? " with-icon" : "")}
        style={icon ? {} : {}}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
