import Card from "@/components/card";
import Category from "@/components/category";
import useCart from "@/hooks/useCart";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { books } = useLocalStorage();
  const { filter } = useCart();
  const navigate = useNavigate();

  const filteredBooks = Array.from(books.values()).filter((book) =>
    book.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container-home">
      <div className="container-home_category">
        <Category />
      </div>
      <div className="container-home_books">
        <div className="container-home_books_view">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((b, idx) => (
              <Card
                key={idx}
                book={b}
                onClick={() => {
                  navigate(`/book/${b.isbn}`)
                }}
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No se encontraron libros.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
