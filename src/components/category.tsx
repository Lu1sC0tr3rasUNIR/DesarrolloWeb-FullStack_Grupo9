import useLocalStorage from "@/hooks/useLocalStorage";
import Checkbox from "./checkbox";
import Input from "./input";
import Button from "./button";

export default function Category() {
  const { category } = useLocalStorage();
  return (
    <div className="category-container">
      <div className="category-container_inner">
        <p>Categorías destacadas</p>
      </div>
      <div className="category-container_list">
        {Array.from(category.values()).map((cat, idx) => (
          <Checkbox key={idx} label={cat.label} checked={cat.checked} />
        ))}
      </div>
      <div className="category-container_subscription">
        <p>
          ¡Mantente en contacto! Únete a nuestro boletín y no te pierdas ningún
          lanzamiento.
        </p>
        <Input placeholder="Ingresa tu correo electrónico" />
        <Button label="Suscribirse" />       
      </div>
    </div>
  );
}
