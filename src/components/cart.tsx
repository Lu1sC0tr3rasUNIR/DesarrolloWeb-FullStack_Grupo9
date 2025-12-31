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
    <div className="cart__overlay">
      <div className="cart__modal">
        {/* HEADER */}
        <header className="cart__header">
          <h2>Resumen de pedido</h2>
          <Button
            label="✕"
            onClick={setCartStatus}
            variant="primary"
          />
        </header>

        {/* BODY (DOS COLUMNAS) */}
        <div className="cart__body">
          {/* LISTA DE PRODUCTOS */}
          <div className="cart__items">
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
          <aside className="cart__summary">
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
        <footer className="cart__footer">
          <span className="cart__step active">Carro de compras</span>
          <span className="cart__step">Información de envío</span>
          <span className="cart__step">Confirmación y pago</span>
        </footer>
      </div>
    </div>
  );
}
