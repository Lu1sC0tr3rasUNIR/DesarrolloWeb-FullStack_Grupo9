import Icons from "./icons";

interface CounterProps {
  count: number;
  clickAdd: () => void;
  clickRemove: () => void;
}

export default function Counter({
  count,
  clickAdd,
  clickRemove,
}: CounterProps) {
  return (
    <div className="counter">
      <button
        type="button"
        className="counter__button"
        onClick={clickRemove}
        disabled={count <= 1}
      >
        <Icons name="minus" />
      </button>

      <div className="counter__display">{count}</div>

      <button
        type="button"
        className="counter__button"
        onClick={clickAdd}
      >
        <Icons name="plus" />
      </button>
    </div>
  );
}
