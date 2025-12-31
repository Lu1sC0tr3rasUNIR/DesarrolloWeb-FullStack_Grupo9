import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/button";
import Counter from "@/components/counter";
import { ICartItem } from "@/interfaces/hooks/IUseCart";

type Review = {
  comment: string;
  rating: number;
  date: string;
};

export default function Book() {
  const {
    getBook,
    updateCart,
    cart,
    setCartStatus,
  } = useLocalStorage();

  const { isbn } = useParams<{ isbn: string }>();
  const navigate = useNavigate();

  const book = useMemo(() => {
    return isbn ? getBook(isbn) : undefined;
  }, [isbn, getBook]);

  if (!book) {
    return (
      <div className="book__container">
        <p>Libro no encontrado.</p>
      </div>
    );
  }

  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const unitPrice = book.price ?? 0;
  const totalPrice = unitPrice * quantity;

  const [reviews, setReviews] = useState<Review[]>([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (isbn) {
      const saved = localStorage.getItem(`reviews-${isbn}`);
      if (saved) {
        setReviews(JSON.parse(saved));
      }
    }
  }, [isbn]);

  const saveReview = () => {
    if (!comment || rating === 0) return;

    const newReview: Review = {
      comment,
      rating,
      date: new Date().toISOString(),
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${isbn}`, JSON.stringify(updatedReviews));
    setComment("");
    setRating(0);
  };

  const handleAddToCart = () => {
    const newCart = new Map(cart);
    const key = book.isbn;

    if (newCart.has(key)) {
      const item = newCart.get(key) as ICartItem;
      item.quantity += quantity;
      item.value = item.quantity * unitPrice;
      newCart.set(key, item);
    } else {
      newCart.set(key, {
        book,
        quantity,
        value: unitPrice * quantity,
      });
    }

    updateCart(newCart);

    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  const handleBuyNow = () => {
    const newCart = new Map(cart);
    const key = book.isbn;

    newCart.set(key, {
      book,
      quantity,
      value: unitPrice * quantity,
    });

    updateCart(newCart);
    setCartStatus();        
    navigate("/checkout");
  };

  return (
    <div className="book">
      <div className="book__container">
        <div className="book__main">
        <div className="book__image">
          <img
            src={book.image || "https://via.placeholder.com/220x300"}
            alt={book.title}
          />
        </div>

        <div className="book__info">
          <h1>{book.title}</h1>
          <p className="book__description">{book.description}</p>

          <p><strong>Autor:</strong> {book.author}</p>
          <p><strong>Categoría:</strong> {book.category}</p>
          <p><strong>Editorial:</strong> {book.publisher} – {book.year}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
        </div>

        <div className="book__buy">
          <p className="book__price">${totalPrice} USD</p>
          <p className="book__unit-price">Precio unitario: ${unitPrice} USD</p>

          <Counter count={quantity} clickAdd={increase} clickRemove={decrease} />

          <Button
            label={`Añadir ${quantity} al cesto`}
            onClick={handleAddToCart}
            variant="success"
          />

          {addedMessage && (
            <p className="book__added-success">
              ✔ Agregado correctamente al carrito
            </p>
          )}

          <Button
            label="Comprar"
            onClick={handleBuyNow}
            variant="primary"
          />
        </div>
      </div>

        <div className="book__reviews">
        <h2>Opiniones</h2>

        {reviews.length === 0 && (
          <p>Aún no hay opiniones para este libro.</p>
        )}

        {reviews.map((review, index) => (
          <div className="book__review" key={index}>
            <p><strong>Usuario anónimo</strong></p>

            <div className="book__stars">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>

            <p>{review.comment}</p>
          </div>
        ))}

        <h3>Escribe tu opinión</h3>

        <div className="book__rating-input">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                cursor: "pointer",
                fontSize: "22px",
                color: star <= rating ? "gold" : "#ccc",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tu opinión se publicará como anónima"
        />

        <Button
          label="Guardar"
          onClick={saveReview}
          variant="primary"
        />
        </div>
      </div>
    </div>
  );
}
