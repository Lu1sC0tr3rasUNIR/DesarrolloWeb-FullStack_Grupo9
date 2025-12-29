import Button from "@/components/button";
import useCart from "@/hooks/useCart";
import useLocalStorage from "@/hooks/useLocalStorage";
import "@/styles/components/checkout.scss";

export default function CheckOut() {
  const { cart, totalValue } = useLocalStorage();
  const { getTotalBooks } = useCart();

  const shippingCost = 5;
  const totalWithShipping = totalValue + shippingCost;

  return (
    <div className="checkout-container">
      <h1>Resumen de pedido</h1>

      <div className="checkout-content">
        {/* FORMULARIO */}
        <div className="checkout-form">
          <h2>Dirección de envío</h2>

          <label>
            País
            <select>
              <option>Seleccione país</option>
              <option>Colombia</option>
            </select>
          </label>

          <label>
            Estado / Departamento
            <select>
              <option>Seleccione estado/departamento</option>
              <option>Huila</option>
            </select>
          </label>

          <label>
            Ciudad
            <select>
              <option>Seleccione ciudad</option>
              <option>Neiva</option>
            </select>
          </label>

          <label>
            Dirección de residencia
            <input type="text" placeholder="Calle, carrera, número..." />
          </label>
        </div>

        {/* INFO */}
        <div className="checkout-info">
          <div className="info-box">
            <span className="icon">🚚</span>
            <p><strong>Tiempo de entrega estimado</strong></p>
            <p>3 días</p>
          </div>

          <div className="info-box">
            <span className="icon">💲</span>
            <p><strong>Costo de envío</strong></p>
            <p>${shippingCost} USD</p>
          </div>
        </div>
      </div>

      {/* RESUMEN */}
      <div className="checkout-summary">
        <p><strong>Cantidad de productos:</strong> {getTotalBooks()}</p>
        <p><strong>Total productos:</strong> ${totalValue} USD</p>
        <p><strong>Total con envío:</strong> ${totalWithShipping} USD</p>

        <Button
          label="Continuar al pago"
          icon="arrow-right"
          onClick={() => {
            alert("Aquí iría la página de Confirmación y pago");
          }}
        />
      </div>

      {/* PASOS */}
      <div className="checkout-steps">
        <span>Carro de compras</span>
        <span className="active">Información de envío</span>
        <span>Confirmación y pago</span>
      </div>
    </div>
  );
}
