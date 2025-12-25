import { IButton } from "@/interfaces/components/IButton";
import Icons from "@/components/icons";

export default function Button({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  className,
  icon,
  iconColor,
}: IButton) {
  return (

    <button
      onClick={onClick}
      disabled={disabled}
      className={`button-base ${variant} ${className}`}
    >
      {icon && (
        <span className="button-icon">
          <Icons name={icon} color={iconColor} />
        </span>
      )}
      <span className="button-label">{label}</span>
    </button>
  );
}
