import { StorageContext } from "@/context/StorageContext";
import { ICheckbox } from "@/interfaces/components/ICheckbox";
import { IStorageContext, IValueFilter } from "@/interfaces/context/IStorageContext";
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
  const [activeCart, setActiveCart] = useState<boolean>(false);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [filter, setFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<Map<string, string>>(
    new Map()
  );
  const [valueFilter, setValueFilter] = useState<IValueFilter>({
    min: 0,
    max: 1000,
  });

  //Funciones de filtro
  const addFilter = useCallback(
    (filter: string) => {
      setFilter(filter);
    },
    [setFilter]
  );

  const updateCatergoryFilter = useCallback(
    (categoryMap: Map<string, string>) => {
      setCategoryFilter(categoryMap);
    },
    [setCategoryFilter, categoryFilter]
  );

  const updateValueFilter = useCallback((min: number, max: number) => {
    setValueFilter({ min, max });
  }, []);

  //Funciones de libros
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
    setActiveCart(!activeCart);
  }, [activeCart]);

  //LLenar el backend
  useEffect(() => {
    const storedBooks = myBackend();
    const categoryBooks = myCategorys();

    if (storedBooks) {
      storedBooks.forEach((book) => {
        booksMap.set(book.isbn, book);
      });
      setBooks(booksMap);
    }
    if (categoryBooks) {
      categoryBooks.forEach((data) => {
        categoryMap.set(data, { checked: false, label: data });
      });
      setCategory(categoryMap);
    }
  }, []);

  const value: IStorageContext = useMemo(
    () => ({
      activeCart,
      addBook,
      addFilter,
      books,
      cart,
      category,
      categoryFilter,
      updateCatergoryFilter,
      filter,
      getBook,
      removeBook,
      setCartStatus,
      totalValue,
      updateCart,
      valueFilter,
      updateValueFilter,
    }),
    [
      books,
      category,
      cart,
      addBook,
      removeBook,
      getBook,
      updateCart,
      activeCart,
      setCartStatus,
    ]
  );

  return (
    <StorageContext.Provider value={value}>
      {children}
    </StorageContext.Provider>
  );
}
