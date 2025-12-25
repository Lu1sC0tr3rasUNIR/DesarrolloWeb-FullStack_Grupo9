import { ICheckbox } from "@/interfaces/components/ICheckbox";
import { IStorageContext } from "@/interfaces/context/IStorageContext";
import { ICartItem } from "@/interfaces/hooks/IUseCart";
import { IBooks } from "@/interfaces/lib/myBackendInterface";
import { createContext } from "react";

export const StorageContext = createContext<IStorageContext>({
  getBook: () => {},
  addBook: () => {},
  removeBook: () => {},
  books: new Map<string, IBooks>(),
  category: new Map<string, ICheckbox>(),
  cart: new Map<string, ICartItem>(),
  updateCart: () => {},
  activeCart: false,
  setCartStatus: () => {},
});
