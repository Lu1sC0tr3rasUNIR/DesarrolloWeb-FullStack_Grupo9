
import { ICard } from "@/interfaces/components/ICards";
import Button from "./button";
import useCart from "@/hooks/useCart";
import { MouseEvent } from "react";

export default function Card({ book, onClick }: ICard) {
  const { addBook } = useCart();

  const buttonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addBook(book, 1);
  };

  return (
    <div className="card" onClick={onClick}>
      <div className="card__image">
        <img
          src={book.image}
          alt={`${book.title} - portada`}
          loading="lazy"
        />
      </div>

      <div className="card__header">
        <h2>{book.title}</h2>
        <div className="card__isbn">ISBN: {book.isbn}</div>
      </div>

      <div className="card__body">
        <p>{book.description}</p>
      </div>

      <div className="card__footer">
        <p>Price: ${book.price}</p>
        <Button
          label="Agregar"
          className="w-100"
          icon="plus"
          iconColor="white"
          onClick={buttonClick}
        />
      </div>
    </div>
  );
}

