import { IBooks } from "../lib/myBackendInterface";

export interface IUseCart {
  cartBooks: Map<string, ICartItem>;

  addBook: (book: IBooks, quantity: number) => void;
  removeBook: (isbn: string) => void;
  updateBookQuantity: (isbn: string, quantity: number) => void;

  clearCart: () => void;
  getTotalBooks: () => number;

  totalValue: number;
}

export interface ICartItem {
  book: IBooks;
  quantity: number;
  value: number;
}
