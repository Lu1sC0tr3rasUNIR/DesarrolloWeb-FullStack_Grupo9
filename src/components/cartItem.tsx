import { ICartItem } from "@/interfaces/hooks/IUseCart";
import Counter from "./counter";
import useCart from "@/hooks/useCart";
import Button from "./button";

export default function CartItem({ book, quantity, value }: ICartItem) {
  const { updateBookQuantity, removeBook } = useCart();

  const handleAdd = () => {
    updateBookQuantity(book.isbn, quantity + 1);
  };

  const handleRemove = () => {
    if (quantity <= 1) return;
    updateBookQuantity(book.isbn, quantity - 1);
  };

  const handleRemoveBook = () => {
    removeBook(book.isbn);
  };

  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <img
          src={book.image || "https://via.placeholder.com/120x160"}
          alt={book.title}
        />
      </div>

      <div className="cart-item__info">
        <h3>{book.title}</h3>

        <div className="cart-item__counter">
          <span>Unidades:</span>
          <Counter
            count={quantity}
            clickAdd={handleAdd}
            clickRemove={handleRemove}
          />
        </div>

        <p>Precio por unidad: ${book.price}</p>

        <p className="cart-item__subtotal">
          <strong>Subtotal:</strong> ${value}
        </p>
      </div>

      <div className="cart-item__actions">
        <Button
          label="Remover"
          icon="close"
          onClick={handleRemoveBook}
        />
      </div>
    </div>
  );
}
