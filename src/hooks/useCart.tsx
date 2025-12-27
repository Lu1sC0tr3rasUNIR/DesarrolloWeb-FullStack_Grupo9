import { useState, useCallback, useMemo } from "react";
import { IBooks } from "@/interfaces/lib/myBackendInterface";
import { ICartItem, IUseCart } from "@/interfaces/hooks/IUseCart";
import useLocalStorage from "./useLocalStorage";

export default function useCart(): IUseCart {
  const { cart, updateCart, totalValue, addFilter, filter } = useLocalStorage();

  //Funcion para agregar un libro al carrito
  const addBook = useCallback(
    (book: IBooks, quantity: number) => {
      const prevCart = new Map(cart);
      // Eliminar el libro si ya existe para actualizar la cantidad
      prevCart.delete(book.id.toString());
      const value = (book.price ?? 0) * quantity;
      // Agregar el libro con la nueva cantidad
      prevCart.set(book.id.toString(), { book, quantity, value });
      updateCart(prevCart);
    },
    [cart, updateCart, totalValue]
  );

  //Funcion para eliminar un libro del carrito
  const removeBook = useCallback(
    (bookId: number) => {
      const prevCart = new Map(cart);
      prevCart.delete(bookId.toString());
      updateCart(prevCart);
    },
    [cart, updateCart, totalValue]
  );

  //Funcion para actualizar la cantidad de un libro en el carrito
  const updateBookQuantity = useCallback(
    (bookId: number, quantity: number) => {
      const prevCart = new Map(cart);
      const item = prevCart.get(bookId.toString());
      if (item) {
        item.quantity = quantity;
        item.value = (item.book.price ?? 0) * quantity;
        prevCart.set(bookId.toString(), item);
        updateCart(prevCart);
      }
    },
    [cart, updateCart, totalValue]
  );

  //Funcion para limpiar el carrito
  const clearCart = useCallback(() => {
    updateCart(new Map());
  }, [updateCart, totalValue, cart]);


  //Funcion para obtener el total de libros en el carrito
  const getTotalBooks = useCallback((): number => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  }, [cart, totalValue, updateCart]);
  
  return {
    cartBooks: cart,
    totalValue,
    addFilter,
    addBook,
    removeBook,
    updateBookQuantity,
    clearCart,
    getTotalBooks,
    filter
  };
}
/*

  const [cartItems, setCartItems] = useState<ICartItem[]>(() => {
    // Inicializar desde localStorage
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sincronizar con localStorage cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (book: IBooks, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.book.id === book.id);

      if (existingItem) {
        // Si ya existe, actualizar cantidad
        return prevItems.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Si no existe, agregar nuevo item
        return [...prevItems, { book, quantity }];
      }
    });
  };

  const removeFromCart = (bookId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.book.id !== bookId)
    );
  };

  const updateQuantity = (bookId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.book.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = (): number => {
    return cartItems.reduce(
      (total, item) => total + (item.book.price || 0) * item.quantity,
      0
    );
  };

  const isInCart = (bookId: number): boolean => {
    return cartItems.some((item) => item.book.id === bookId);
  };

  const getItemQuantity = (bookId: number): number => {
    const item = cartItems.find((item) => item.book.id === bookId);
    return item ? item.quantity : 0;
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
    getItemQuantity,
  };
  */
