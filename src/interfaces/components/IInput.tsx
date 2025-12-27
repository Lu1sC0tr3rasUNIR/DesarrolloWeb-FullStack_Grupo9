import { IIconName } from "./IICons";

export interface IInput {
  id?: string;
  label?: string;
  placeholder?: string;
  type?: 
    | 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
    | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color'
    | 'file' | 'hidden' | 'checkbox' | 'radio' | 'range' | 'search'
    | 'submit' | 'reset' | 'button';
  icon?: IIconName;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}