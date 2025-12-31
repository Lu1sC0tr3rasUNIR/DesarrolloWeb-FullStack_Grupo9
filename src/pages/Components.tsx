import Button from "@/components/button";
import Icons from "@/components/icons";
import Input from "@/components/input";
import Select from "@/components/select";
import Modal from "@/components/modal";
import { useState } from "react";

export default function Components() {
  const [modalSingleOpen, setModalSingleOpen] = useState(false);
  const [modalDoubleOpen, setModalDoubleOpen] = useState(false);
  return (
    <div className="components__container">
      <h1 className="components__title">Componentes de la app</h1>
      <div className="component__section">
        <div className="component__group">
          <Button label="Aceptar" variant="primary" icon="check" />
          <Button label="Cancelar" variant="danger" icon="close"></Button>
          <Button label="Guardar" variant="success" icon="check" />
          <Button label="Alerta" variant="alert" icon="info"></Button>
        </div>
      </div>
      <div className="component__section">
        
      </div>
      <div className="component__section">
        <div className="component__group">
          <Input />
        </div>
      </div>
      <div className="component__section">
        <div className="component__group">
          <Select
            label="hola"
            options={[
              { label: "1", value: "1" },
              { label: "2", value: "1" },
              { label: "3", value: "1" },
            ]}
          />
        </div>
      </div>
      <div className="component__section">
        <div className="component__group">
          <Icons name="check" />
          <Icons name="info" />
          <Icons name="close" />
          <Icons name="plus" />
          <Icons name="minus" />
          <Icons name="cart" />
        </div>
      </div>
      <div className="component__section">
        <h2 className="component__heading">Modales</h2>
        <div className="component__group">
          <Button 
            label="Abrir Modal - Solo Aceptar" 
            variant="primary" 
            onClick={() => setModalSingleOpen(true)}
          />
          <Button 
            label="Abrir Modal - Aceptar y Rechazar" 
            variant="alert" 
            onClick={() => setModalDoubleOpen(true)}
          />
        </div>
      </div>

      {/* Modal con un solo botón */}
      <Modal
        title="Notificación"
        description="Esta es una notificación simple que solo requiere confirmación."
        type="single"
        isOpen={modalSingleOpen}
        onAccept={() => {
          console.log('Modal aceptado');
          setModalSingleOpen(false);
        }}
        acceptLabel="Entendido"
      />

      {/* Modal con dos botones */}
      <Modal
        title="Confirmar acción"
        description="¿Estás seguro de que deseas realizar esta acción? Esta operación no se puede deshacer."
        type="double"
        isOpen={modalDoubleOpen}
        onAccept={() => {
          console.log('Acción confirmada');
          setModalDoubleOpen(false);
        }}
        onReject={() => {
          console.log('Acción cancelada');
          setModalDoubleOpen(false);
        }}
        acceptLabel="Confirmar"
        rejectLabel="Cancelar"
      />
    </div>
  );
}
