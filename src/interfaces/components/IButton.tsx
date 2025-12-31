import { MouseEvent } from "react";
import { IICons } from "./IICons";

export interface IButton{
  label: string;
  onClick?: (() => void) | ((e: MouseEvent<HTMLButtonElement>) => void);
  variant?: "primary" | "success" | "danger" | "alert";
  disabled?: boolean;
  className?: string;
  icon?: IICons["name"];
  iconColor?: string;
}