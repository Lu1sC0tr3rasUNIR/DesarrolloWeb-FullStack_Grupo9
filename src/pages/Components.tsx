import Button from "@/components/button";
import Card from "@/components/card";
import Counter from "@/components/counter";
import Icons from "@/components/icons";
import Input from "@/components/input";
import Select from "@/components/select";

export default function Components() {
  return (
    <div className="components-container">
      <h1>Componentes de la app</h1>
      <div className="component-section">
        <div className="component-group">
          <Button label="Aceptar" variant="primary" icon="check" />
          <Button label="Cancelar" variant="danger" icon="close"></Button>
          <Button label="Guardar" variant="success" icon="check" />
          <Button label="Alerta" variant="alert" icon="info"></Button>
        </div>
      </div>
      <div className="component-section">
        <div className="component-group">
          <Counter count={0} />
        </div>
      </div>
      <div className="component-section">
        <div className="component-group">
          <Input />
        </div>
      </div>
      <div className="component-section">
        <div className="component-group">
          <Select
            options={[
              { label: "1", value: "1" },
              { label: "2", value: "1" },
              { label: "3", value: "1" },
            ]}
          />
        </div>
      </div>
      <div className="component-section">
        <div className="component-group">
          <Icons name="check" />
          <Icons name="info" />
          <Icons name="close" />
          <Icons name="plus" />
          <Icons name="minus" />
          <Icons name="cart" />
        </div>
      </div>
    </div>
  );
}
