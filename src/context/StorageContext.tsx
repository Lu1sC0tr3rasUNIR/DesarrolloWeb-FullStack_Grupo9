import { IStorageContext } from "@/interfaces/components/context/IStorageContext";
import { ICheckbox } from "@/interfaces/components/ICheckbox";
import { ICartItem } from "@/interfaces/hooks/IUseCart";
import { IBooks } from "@/interfaces/lib/myBackendInterface";
import { createContext } from "react";

export const StorageContext = createContext<IStorageContext>({
  cart: new Map<string, ICartItem>(),
  activeCart: false,
  addBook: () => {},
  filter: "",
  addFilter: () => {},
  books: new Map<string, IBooks>(),
  category: new Map<string, ICheckbox>(),
  categoryFilter: new Map<string, string>(),
  updateCatergoryFilter: () => {},
  getBook: () => undefined,
  removeBook: () => {},
  setCartStatus: () => {},
  totalValue: 0,
  updateCart: () => {},
  valueFilter: { min: 0, max: 1000 },
  updateValueFilter: () => {},
});
