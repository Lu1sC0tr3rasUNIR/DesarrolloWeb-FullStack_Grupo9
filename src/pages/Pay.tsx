import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/button";
import Input from "@/components/input";
import Checkbox from "@/components/checkbox";
import Modal from "@/components/modal";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Pay() {
  const navigate = useNavigate();
  const { cart, totalValue, updateCart } = useLocalStorage();

  const [shippingInfo, setShippingInfo] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "paypal" | "pse"
  >("card");

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const safeTotal = Number(totalValue) || 0;
  const shippingCost = 5;
  const total = safeTotal + shippingCost;

  useEffect(() => {
    const info = localStorage.getItem("shipping_info");
    if (!info) {
      navigate("/checkout");
      return;
    }
    setShippingInfo(JSON.parse(info));
  }, [navigate]);

  const canPay =
    paymentMethod !== "card" ||
    (cardNumber.length >= 12 && expiry.length === 5 && cvv.length === 3);

  function handlePay() {
    if (!canPay) return;
    setShowSuccessModal(true);
  }

  function handleFinish() {
    updateCart(new Map());
    localStorage.removeItem("shipping_info");
    setShowSuccessModal(false);
    navigate("/home");
  }

  function handleExpiryChange(value: string) {
    let clean = value.replace(/\D/g, "").slice(0, 4);
    if (clean.length >= 3) {
      clean = clean.slice(0, 2) + "/" + clean.slice(2);
    }
    setExpiry(clean);
  }

  function handleCvvChange(value: string) {
    setCvv(value.replace(/\D/g, "").slice(0, 3));
  }

  if (!shippingInfo) return null;

  return (
    <div className="pay-page">
      <h1>Confirmación y pago</h1>

      <div className="pay-grid">
        <div className="pay-left">
          <h2>Resumen de pedido</h2>

          <div className="order-list">
            {Array.from(cart.values()).map((item: any, idx) => (
              <div className="order-row" key={idx}>
                <span>{item.title}</span>
                <span>
                  Cantidad: {item.quantity} · ${item.value} USD
                </span>
              </div>
            ))}
          </div>

          <div className="shipping-box">
            <h3>Dirección de envío</h3>
            <p>{shippingInfo.address}</p>
            <p>
              {shippingInfo.city} · {shippingInfo.department}
            </p>
            <p>{shippingInfo.country}</p>
          </div>
        </div>

        <div className="pay-right">
          <div className="coupon-box">
            <p>¿Tienes un cupón disponible?</p>
            <div className="coupon-row">
              <input placeholder="Ingresa cupón aquí" />
              <button onClick={() => alert("Por ahora cupón no válido")}>
                Aplicar
              </button>
            </div>
          </div>

          <div className="totals-box">
            <p>Subtotal: ${safeTotal} USD</p>
            <p>Valor del envío: ${shippingCost} USD</p>
            <strong>Total: ${total} USD</strong>
          </div>

          <div className="payment-methods">
            <p>Método de pago</p>
            <div className="method-buttons">
              <button
                className={paymentMethod === "card" ? "active" : ""}
                onClick={() => setPaymentMethod("card")}
              >
                Tarjeta Crédito/Débito
              </button>
              <button
                className={paymentMethod === "paypal" ? "active" : ""}
                onClick={() => setPaymentMethod("paypal")}
              >
                PayPal
              </button>
              <button
                className={paymentMethod === "pse" ? "active" : ""}
                onClick={() => setPaymentMethod("pse")}
              >
                PSE
              </button>
            </div>
          </div>

          {paymentMethod === "card" && (
            <div className="card-form">
              <Input
                label="Número de tarjeta"
                value={cardNumber}
                onChange={(e: any) =>
                  setCardNumber(e.target.value.replace(/\D/g, ""))
                }
              />

              <Input
                label="Fecha de expiración"
                placeholder="MM/AA"
                value={expiry}
                onChange={(e: any) => handleExpiryChange(e.target.value)}
              />

              <Input
                label="CVV"
                value={cvv}
                onChange={(e: any) => handleCvvChange(e.target.value)}
              />

              <Checkbox
                checked={saveCard}
                onChange={() => setSaveCard(!saveCard)}
                label="Guardar información de pago"
              />
            </div>
          )}

          <Button label="Pagar" onClick={handlePay} disabled={!canPay} />
        </div>
      </div>

      <div className="checkout-steps">
        <span>Carro de compras</span>
        <span>Información de envío</span>
        <span className="active">Confirmación y pago</span>
      </div>

      <Modal
        title="¡Pago exitoso!"
        description="Tu pedido fue realizado correctamente."
        type="single"
        isOpen={showSuccessModal}
        onAccept={handleFinish}
        acceptLabel="Aceptar"
      />
    </div>
  );
}
