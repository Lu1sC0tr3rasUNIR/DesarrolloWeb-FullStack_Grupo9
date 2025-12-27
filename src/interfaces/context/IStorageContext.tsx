import { ICheckbox } from "../components/ICheckbox";
import { ICartItem } from "../hooks/IUseCart";
import { IBooks } from "../lib/myBackendInterface";

export interface IStorageContext {
  getBook: (key: string) => IBooks | undefined;
  addBook: (book: IBooks) => void;
  removeBook: (key: string) => void;
  books: Map<string, IBooks>;
  category: Map<string, ICheckbox>;
  cart: Map<string, ICartItem>;
  updateCart: (newCart: Map<string, ICartItem>) => void;
  activeCart: boolean;
  setCartStatus: () => void;
  totalValue: number;
  addFilter: (filter: string) => void;
  filter: string;
}
