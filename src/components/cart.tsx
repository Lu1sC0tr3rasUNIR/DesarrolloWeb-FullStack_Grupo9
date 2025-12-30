import useLocalStorage from "@/hooks/useLocalStorage";
import useCart from "@/hooks/useCart";
import CartItem from "./cartItem";
import Button from "./button";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, activeCart, setCartStatus } = useLocalStorage();
  const { totalValue, getTotalBooks } = useCart();
  const navigate = useNavigate();

  // Si el carrito no está activo, no se renderiza el modal
  if (!activeCart) return null;

  const items = Array.from(cart.values());

  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        {/* HEADER */}
        <header className="cart-header">
          <h2>Resumen de pedido</h2>
          <Button
            label="✕"
            onClick={setCartStatus}
            variant="primary"
          />
        </header>

        {/* BODY (DOS COLUMNAS) */}
        <div className="cart-body">
          {/* LISTA DE PRODUCTOS */}
          <div className="cart-items">
            {items.length === 0 ? (
              <p>El carrito está vacío.</p>
            ) : (
              items.map((item) => (
                <CartItem
                  key={item.book.isbn}
                  book={item.book}
                  quantity={item.quantity}
                  value={item.value}
                />
              ))
            )}
          </div>

          {/* RESUMEN */}
          <aside className="cart-summary">
            <p>
              <strong>Cantidad total:</strong>{" "}
              {getTotalBooks()}
            </p>
            <p>
              <strong>Total:</strong> ${totalValue} USD
            </p>

            <Button
              label="Realizar pedido"
              onClick={() => {
                setCartStatus();       // cerrar modal
                navigate("/checkout"); // ir a checkout
              }}
            />
          </aside>
        </div>

        {/* PASOS */}
        <footer className="cart-steps">
          <span className="active">Carro de compras</span>
          <span>Información de envío</span>
          <span>Confirmación y pago</span>
        </footer>
      </div>
    </div>
  );
}
