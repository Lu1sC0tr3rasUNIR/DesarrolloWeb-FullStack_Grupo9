import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/button";
import Input from "@/components/input";
import Select from "@/components/select";
import useCart from "@/hooks/useCart";
import useLocalStorage from "@/hooks/useLocalStorage";
import { colombiaMainCities } from "@/data/colombiaMainCities";

export default function CheckOut() {
  const { totalValue } = useLocalStorage();
  const { getTotalBooks } = useCart();
  const navigate = useNavigate();

  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const shippingCost = 5;
  const totalWithShipping = totalValue + shippingCost;

  const canContinue =
    department.trim() !== "" &&
    city.trim() !== "" &&
    address.trim().length >= 3;

  const handleContinueToPayment = () => {
    if (!canContinue) return;

    localStorage.setItem(
      "shipping_info",
      JSON.stringify({
        department,
        city,
        address,
        country: "Colombia",
      })
    );

    navigate("/pay");
  };

  return (
    <div className="checkout-container">
      <h1>Resumen de pedido</h1>

      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Dirección de envío</h2>

          <Select
            label="País"
            options={[{ value: "Colombia", label: "Colombia" }]}
            value="Colombia"
            onChange={() => {}}
            disabled
          />

          <Select
            label="Departamento"
            options={[
              { value: "", label: "Seleccione departamento" },
              ...Object.keys(colombiaMainCities).map((d) => ({
                value: d,
                label: d.replace(/_/g, " ").toUpperCase(),
              })),
            ]}
            value={department}
            onChange={(value) => {
              setDepartment(value);
              setCity("");
            }}
          />

          <Select
            label="Ciudad"
            options={[
              { value: "", label: "Seleccione ciudad" },
              ...(department
                ? colombiaMainCities[department].map((c) => ({
                    value: c,
                    label: c,
                  }))
                : []),
            ]}
            value={city}
            onChange={(value) => setCity(value)}
            disabled={!department}
          />

          <Input
            label="Dirección de residencia"
            type="text"
            placeholder="Calle, carrera, número..."
            value={address}
            onChange={(e: any) => setAddress(e.target.value)}
          />
        </div>

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

      <div className="checkout-summary">
        <p><strong>Cantidad de productos:</strong> {getTotalBooks()}</p>
        <p><strong>Total productos:</strong> ${totalValue} USD</p>
        <p><strong>Total con envío:</strong> ${totalWithShipping} USD</p>

        <Button
          label="Continuar al pago"
          icon="arrow-right"
          onClick={handleContinueToPayment}
          disabled={!canContinue}
        />
      </div>
    </div>
  );
}
