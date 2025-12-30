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
        className="counter-btn counter-btn-left"
        onClick={clickRemove}
        disabled={count <= 1}
      >
        <span className="button-icon">
          <Icons name="minus" />
        </span>
      </button>

      <div className="counter-display">{count}</div>

      <button
        type="button"
        className="counter-btn counter-btn-right"
        onClick={clickAdd}
      >
        <span className="button-icon">
          <Icons name="plus" />
        </span>
      </button>
    </div>
  );
}
