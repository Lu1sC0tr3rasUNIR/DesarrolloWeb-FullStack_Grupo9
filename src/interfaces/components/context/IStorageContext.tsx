import { ICartItem } from "@/interfaces/hooks/IUseCart";
import { IBooks } from "@/interfaces/lib/myBackendInterface";
import { ICheckbox } from "../ICheckbox";

export interface IStorageContext {
  activeCart: boolean;
  addBook: (book: IBooks) => void;
  filter: string;
  addFilter: (filter: string) => void;
  books: Map<string, IBooks>;
  cart: Map<string, ICartItem>;
  category: Map<string, ICheckbox>;
  categoryFilter: Map<string, string>;
  updateCatergoryFilter: (categoryMap: Map<string, string>) => void;
  getBook: (key: string) => IBooks | undefined;
  removeBook: (key: string) => void;
  setCartStatus: () => void;
  totalValue: number;
  updateCart: (newCart: Map<string, ICartItem>) => void;
  valueFilter: IValueFilter;
  updateValueFilter: (min: number, max: number) => void;
}

export interface IValueFilter {
  min: number | null;
  max: number | null;
}
