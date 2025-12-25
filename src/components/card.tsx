import { ICard } from "@/interfaces/components/ICards";
import Button from "./button";
import useCart from "@/hooks/useCart";
import { MouseEvent } from "react";
import { IBooks } from "@/interfaces/lib/myBackendInterface";

export default function Card({ book, onClick }: ICard) {
  const { addBook } = useCart();

  const buttonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addBook(book, 1);
  };

  return (
    <div className="card" onClick={onClick}>
      <div className="card_header">
        <h2>{book.title}</h2>
        <div className="isbn">ISBN: {book.isbn}</div>
      </div>
      <div className="card_body">
        <p>{book.description}</p>
      </div>
      <div className="card_footer">
        <p>Price: ${book.price}</p>
        <Button
          label="Agregar"
          className="w-100"
          icon="plus"
          onClick={buttonClick}
        />
      </div>
    </div>
  );
}
