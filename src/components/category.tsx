import useLocalStorage from "@/hooks/useLocalStorage";
import Checkbox from "./checkbox";
import Input from "./input";
import Button from "./button";
import useFilter from "@/hooks/useFilter";

export default function Category() {
  const { category } = useLocalStorage();
  const {
    categoryFilter,
    addCategoryFilter,
    removeCategoryFilter,
    valueFilter,
    updateValueFilter,
  } = useFilter();
  return (
    <div className="category__container">
      <div className="category__header">
        <p>Categorías destacadas</p>
      </div>
      <div className="category__list">
        {Array.from(category.values()).map((cat, idx) => (
          <Checkbox
            key={idx}
            label={cat.label}
            checked={categoryFilter.has(cat.label)}
            onChange={() => {
              if (!categoryFilter.has(cat.label)) {
                addCategoryFilter(cat.label);
              } else {
                removeCategoryFilter(cat.label);
              }
            }}
          />
        ))}
      </div>
      <div className="category__filter">
        <Input
          placeholder="Precio mínimo"
          type="number"
          value={valueFilter.min ?? ""}
          onChange={(e) =>
            updateValueFilter(
              e.target.value === "" ? null : +e.target.value,
              valueFilter.max
            )
          }
        />
        <Input
          placeholder="Precio máximo"
          type="number"
          value={valueFilter.max ?? ""}
          onChange={(e) =>
            updateValueFilter(
              valueFilter.min,
              e.target.value === "" ? null : +e.target.value
            )
          }
        />
      </div>

      <div className="category__subscription">
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
