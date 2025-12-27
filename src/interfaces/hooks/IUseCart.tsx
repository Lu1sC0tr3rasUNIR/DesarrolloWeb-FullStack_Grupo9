import { IBooks } from "../lib/myBackendInterface";

export interface IUseCart {
    cartBooks: Map<string, ICartItem>;
    addBook: (book: IBooks, quantity: number) => void;
    removeBook: (bookId: number) => void;
    updateBookQuantity: (bookId: number, quantity: number) => void;
    clearCart: () => void;
    getTotalBooks: () => number;
    totalValue: number;
    addFilter: (filter: string) => void;
    filter: string;
}

export interface ICartItem {
  book: IBooks;
  quantity: number;
  value: number;
}