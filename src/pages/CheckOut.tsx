import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/button";
import Input from "@/components/input";
import Select from "@/components/select";
import Modal from "@/components/modal";
import useCart from "@/hooks/useCart";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function CheckOut() {
  const { totalValue, updateCart } = useLocalStorage();
  const { getTotalBooks } = useCart();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const shippingCost = 5;
  const totalWithShipping = totalValue + shippingCost;

  const handlePayment = () => {
    setShowModal(true);
  };

  const handleAcceptPayment = () => {
    updateCart(new Map());
    setShowModal(false);
    navigate("/home");
  };

  return (
    <div className="checkout-container">
      <h1>Resumen de pedido</h1>

      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Dirección de envío</h2>

          <Select
            label="País"
            options={[
              { value: "", label: "Seleccione país" },
              { value: "colombia", label: "Colombia" },
            ]}
            value=""
            onChange={(value) => console.log(value)}
          />

          <Select
            label="Estado / Departamento"
            options={[
              { value: "", label: "Seleccione estado/departamento" },
              { value: "huila", label: "Huila" },
            ]}
            value=""
            onChange={(value) => console.log(value)}
          />

          <Select
            label="Ciudad"
            options={[
              { value: "", label: "Seleccione ciudad" },
              { value: "neiva", label: "Neiva" },
            ]}
            value=""
            onChange={(value) => console.log(value)}
          />
          <Input
            label=" Dirección de residencia"
            type="text"
            placeholder="Calle, carrera, número..."
          />
        </div>

        <div className="checkout-info">
          <div className="info-box">
            <span className="icon">🚚</span>
            <p>
              <strong>Tiempo de entrega estimado</strong>
            </p>
            <p>3 días</p>
          </div>

          <div className="info-box">
            <span className="icon">💲</span>
            <p>
              <strong>Costo de envío</strong>
            </p>
            <p>${shippingCost} USD</p>
          </div>
        </div>
      </div>

      <div className="checkout-summary">
        <p>
          <strong>Cantidad de productos:</strong> {getTotalBooks()}
        </p>
        <p>
          <strong>Total productos:</strong> ${totalValue} USD
        </p>
        <p>
          <strong>Total con envío:</strong> ${totalWithShipping} USD
        </p>

        <Button
          label="Continuar al pago"
          icon="arrow-right"
          onClick={handlePayment}
        />
      </div>

      <div className="checkout-steps">
        <span>Carro de compras</span>
        <span className="active">Información de envío</span>
        <span>Confirmación y pago</span>
      </div>

      <Modal
        title="¡Pago exitoso!"
        description="Tu pedido ha sido procesado correctamente. Recibirás un correo de confirmación en breve."
        type="single"
        isOpen={showModal}
        onAccept={handleAcceptPayment}
        acceptLabel="Aceptar"
      />
    </div>
  );
}
