import { MouseEvent } from "react";
import { IICons } from "./IICons";

export interface IButton{
  label: string;
  onClick?: (() => void) | ((e: MouseEvent<HTMLButtonElement>) => void);
  variant?: "primary" | "success" | "danger" | "alert";
  disabled?: boolean;
  className?: string;
  // optional icon name from the existing Icons component
  icon?: IICons["name"];
  // optional color for the icon
  iconColor?: string;
}