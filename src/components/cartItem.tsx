import { ICartItem } from "@/interfaces/hooks/IUseCart";
import Counter from "./counter";
import useCart from "@/hooks/useCart";
import Button from "./button";

export default function CartItem({ book, quantity, value }: ICartItem) {
  const { updateBookQuantity, removeBook } = useCart();

  const handleAdd = (newQuantity: number) => {
    const updatedQuantity = newQuantity + 1;
    updateBookQuantity(book.id, updatedQuantity);
  };

  const handleRemove = (newQuantity: number) => {
    const updatedQuantity = newQuantity - 1;
    if (updatedQuantity < 1) return;
    updateBookQuantity(book.id, updatedQuantity);
  };

  const removeBookFromCart = () => {
    // Logic to remove book from cart
    removeBook(book.id);
  }

  return (
    <div className="cart-item-container">
      <div className="cart-item-container_image"></div>
      <div className="cart-item-container_info">
        <h2>{book.title}</h2>
        <div className="cart-item-container_info_counter">
          <p>Unidades:</p>
          <Counter
            count={quantity}
            clickAdd={() => handleAdd(quantity)}
            clickRemove={() => handleRemove(quantity)}
          />
        </div>
        <p>Precio por unidad: ${book.price}</p>
        <p>Subtotal: ${value}</p>
      </div>
      <div className="cart-item-container_remove-button">
        <Button label="Remover" icon="close" onClick={removeBookFromCart}/>
      </div>
    </div>
  );
}
