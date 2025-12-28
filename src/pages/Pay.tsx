import { useState } from "react";
import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import Input from "@/components/input";

export default function Pay() {
  const [checked, setChecked] = useState(false);

  function handleCheckboxChange() {
    setChecked(!checked);
  }
  
  return (
    <div>
      <h1>Página de pago</h1>
      <Input
        label="Número de tarjeta"
        placeholder="Ingresa tu número de tarjeta"
      />
      <Input label="Fecha de expiración" placeholder="MM/AA" />
      <Input label="CVV" placeholder="Código de seguridad" />
      <Checkbox
        checked={checked}
        onChange={handleCheckboxChange}
        label="Guardar información de pago para futuras compras"
      />
      <Button label="Pagar Ahora" variant="success" />
      <Button label="Cancelar" variant="danger" />
    </div>
  );
}
