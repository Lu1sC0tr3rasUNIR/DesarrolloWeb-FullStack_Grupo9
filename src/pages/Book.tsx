import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

export default function Book() {
  const { books, getBook } = useLocalStorage();
  const { isbn } = useParams<{ isbn: string }>();

  const book = useMemo(() => {
    return isbn ? getBook(isbn) : null;
  }, [isbn, getBook]);

  useEffect(() => {
    console.log("ISBN del libro:", isbn);
    // Aquí podrías agregar lógica para obtener los detalles del libro usando el ISBN de la URL
  }, []);
  return (
    <div className="container-book">
      <h1>Book Page</h1>
      <p>Detalles del libro con ISBN: {isbn}</p>
      {book ? (
        <div>
          <h2>{book.title}</h2>
          <p>{book.description}</p>
          <p>Precio: ${book.price}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Autor: {book.author}</p>
          <p>Categoría: {book.category}</p>
          <p>
            Editorial: {book.publisher} - Año: {book.year}
          </p>
        </div>
      ) : (
        <p>Libro no encontrado.</p>
      )}
    </div>
  );
}
