import useLocalStorage from "@/hooks/useLocalStorage";
import CartItem from "./cartItem";
import useCart from "@/hooks/useCart";
import Button from "./button";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, activeCart, setCartStatus } = useLocalStorage();
  const { totalValue } = useCart();
  const booksInCart = Array.from(cart.values());
  const navigate = useNavigate();

  if (!activeCart) return null;

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {booksInCart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          {booksInCart.map((item) => (
            <CartItem
              key={item.book.id}
              book={item.book}
              quantity={item.quantity}
              value={item.value}
            />
          ))}
        </div>
      )}
      <p>Total a pagar: ${totalValue}</p>
      <Button
        label="Proceed to Checkout"
        onClick={() => {
          setCartStatus();
          navigate(`/checkout`);
        }}
      />
    </div>
  );
}
