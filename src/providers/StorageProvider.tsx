import { StorageContext } from "@/context/StorageContext";
import { ICheckbox } from "@/interfaces/components/ICheckbox";
import {
  IStorageContext,
  IValueFilter,
} from "@/interfaces/context/IStorageContext";
import { ICartItem } from "@/interfaces/hooks/IUseCart";
import { IBooks } from "@/interfaces/lib/myBackendInterface";
import { myBackend, myCategorys } from "@/lib/myBackend";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function StorageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  /*STATES*/
  const [books, setBooks] = useState<Map<string, IBooks>>(new Map());
  const [category, setCategory] = useState<Map<string, ICheckbox>>(new Map());
  const [cart, setCart] = useState<Map<string, ICartItem>>(new Map());
  const [activeCart, setActiveCart] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Map<string, string>>(
    new Map()
  );
  const [valueFilter, setValueFilter] = useState<IValueFilter>({
    min: 0,
    max: 1000,
  });

  /*FILTROS*/
  const addFilter = useCallback((value: string) => {
    setFilter(value);
  }, []);

  const updateCatergoryFilter = useCallback(
    (categoryMap: Map<string, string>) => {
      setCategoryFilter(categoryMap);
    },
    []
  );

  const updateValueFilter = useCallback((min: number, max: number) => {
    setValueFilter({ min, max });
  }, []);

  /*LIBROS*/
  const getBook = (isbn: string): IBooks | undefined => {
    return books.get(isbn);
  };

  const addBook = useCallback((book: IBooks) => {
    setBooks((prev) => {
      const next = new Map(prev);
      next.set(book.isbn, book);
      return next;
    });
  }, []);

  const removeBook = useCallback((isbn: string) => {
    setBooks((prev) => {
      const next = new Map(prev);
      next.delete(isbn);
      return next;
    });
  }, []);

  /*CARRITO*/
  const updateCart = useCallback((newCart: Map<string, ICartItem>) => {
    setCart(newCart);
    const value = Array.from(newCart.values()).reduce(
      (acc, item) => acc + item.value,
      0
    );
    setTotalValue(value);
  }, []);

  const setCartStatus = useCallback(() => {
    setActiveCart((prev) => !prev);
  }, []);

  /*CARGA INICIAL*/
  useEffect(() => {
    const storedBooks = myBackend();
    const categoryBooks = myCategorys();

    const booksMap = new Map<string, IBooks>();
    const categoryMap = new Map<string, ICheckbox>();

    storedBooks.forEach((book) => {
      booksMap.set(book.isbn, book);
    });

    categoryBooks.forEach((cat) => {
      categoryMap.set(cat, { checked: false, label: cat });
    });

    setBooks(booksMap);
    setCategory(categoryMap);
  }, []);

  /*CONTEXT VALUE*/
  const value: IStorageContext = useMemo(
    () => ({
      activeCart,
      books,
      category,
      cart,
      filter,
      categoryFilter,
      valueFilter,
      totalValue,

      addBook,
      removeBook,
      getBook,

      addFilter,
      updateCatergoryFilter,
      updateValueFilter,

      updateCart,
      setCartStatus,
    }),
    [
      activeCart,
      books,
      category,
      cart,
      filter,
      categoryFilter,
      valueFilter,
      totalValue,
      addBook,
      removeBook,
      updateCart,
    ]
  );

  return (
    <StorageContext.Provider value={value}>
      {children}
    </StorageContext.Provider>
  );
}
