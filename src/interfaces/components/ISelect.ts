import { IIconName } from "./IICons";

export interface ISelectOption {
  value: string;
  label: string;
}

export interface ISelect {
  id?: string;
  label?: string;
  options?: ISelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  icon?: IIconName;
  className?: string;
}