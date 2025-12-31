import Card from "@/components/card";
import Category from "@/components/category";
import Pagination from "@/components/Pagination";
import useFilter from "@/hooks/useFilter";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useState }from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { books, categoryFilter, valueFilter } = useLocalStorage();
  const { filter } = useFilter();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredBooks = Array.from(books.values()).filter((book) => {
    return (
      book.title.toLowerCase().includes(filter.toLowerCase()) &&
      (categoryFilter.size === 0 ||
        book.category.some((cat) => categoryFilter.has(cat))) &&
      book.price >= Number(valueFilter.min) &&
      book.price <= Number(valueFilter.max)
    );
  });

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container--home">
      <div className="container__sidebar">
        <Category />
      </div>
      <div className="container__main">
        <div className="container__grid">
          {paginatedBooks.length > 0 ? (
            paginatedBooks.map((b, idx) => (
              <Card
                key={idx}
                book={b}
                onClick={() => {
                  navigate(`/book/${b.isbn}`);
                }}
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No se encontraron libros.
            </p>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
