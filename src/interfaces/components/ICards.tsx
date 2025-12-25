import { IBooks } from "../lib/myBackendInterface";

export interface ICard {
  book: IBooks;
  onClick?: () => void;
}