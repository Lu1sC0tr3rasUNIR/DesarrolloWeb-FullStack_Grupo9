import { useCallback } from "react";
import { IBooks } from "@/interfaces/lib/myBackendInterface";
import { IUseCart } from "@/interfaces/hooks/IUseCart";
import useLocalStorage from "./useLocalStorage";

export default function useCart(): IUseCart {
  const { cart, updateCart, totalValue } = useLocalStorage();

  /*AGREGAR*/
  const addBook = useCallback(
    (book: IBooks, quantity: number) => {
      const newCart = new Map(cart);
      const key = book.isbn;
      const existing = newCart.get(key);

      if (existing) {
        newCart.set(key, {
          ...existing,
          quantity: existing.quantity + quantity,
          value:
            (existing.quantity + quantity) * (book.price ?? 0),
        });
      } else {
        newCart.set(key, {
          book,
          quantity,
          value: (book.price ?? 0) * quantity,
        });
      }

      updateCart(newCart);
    },
    [cart, updateCart]
  );

  /*ELIMINAR*/
  const removeBook = useCallback(
    (isbn: string) => {
      const newCart = new Map(cart);
      newCart.delete(isbn);
      updateCart(newCart);
    },
    [cart, updateCart]
  );

  /*ACTUALIZAR*/
  const updateBookQuantity = useCallback(
    (isbn: string, quantity: number) => {
      const newCart = new Map(cart);
      const existing = newCart.get(isbn);

      if (!existing) return;

      if (quantity <= 0) {
        newCart.delete(isbn);
      } else {
        newCart.set(isbn, {
          ...existing,
          quantity,
          value: quantity * (existing.book.price ?? 0),
        });
      }

      updateCart(newCart);
    },
    [cart, updateCart]
  );

  /*LIMPIAR CARRITO*/
  const clearCart = useCallback(() => {
    updateCart(new Map());
  }, [updateCart]);

  /*TOTAL DE LIBROS*/
  const getTotalBooks = useCallback((): number => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  }, [cart]);

  return {
    cartBooks: cart,
    totalValue,
    addBook,
    removeBook,
    updateBookQuantity,
    clearCart,
    getTotalBooks,
  };
}
