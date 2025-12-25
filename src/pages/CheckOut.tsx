import Button from "@/components/button";
import useCart from "@/hooks/useCart";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const { cart, totalValue } = useLocalStorage();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  return (
    <div className="checkout-page">
      <h1>CheckOut Page</h1>
      <div className="checkout-items">
        {Array.from(cart.values()).map((item) => (
          <div key={item.book.id} className="checkout-item">
            <p>{item.book.title}</p>
            <p>Cantidad: {item.quantity}</p>
            <p>Precio: ${item.value}</p>
          </div>
        ))}
        <div className="checkout-total">
          <h2>Total a pagar: ${totalValue}</h2>
        </div>
      </div>

      <Button
        label="Confirmar pago"
        icon="check"
        onClick={() => {
          clearCart();
          navigate(`/`);
        }}
      />
    </div>
  );
}
