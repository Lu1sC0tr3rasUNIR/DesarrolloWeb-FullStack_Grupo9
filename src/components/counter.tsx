import { useState } from "react";
import Icons from "./icons";

interface CounterProps {
  count?: number;
  clickAdd?: (value: number) => void;
  clickRemove?: (value: number) => void;
}

export default function Counter({ 
  count = 0, 
  clickAdd,
  clickRemove
 }: CounterProps) {

 


  return (
    <div className="counter">
      <button className="counter-btn counter-btn-left" onClick={() => clickRemove && clickRemove(count)}>
        <span className="button-icon">
          <Icons name="minus" color="rgb(255, 255, 255)" />
        </span>
      </button>
      <div className="counter-display">{count}</div>
      <button className="counter-btn counter-btn-right" onClick={() => clickAdd && clickAdd(count)}>
        <span className="button-icon">
          <Icons name="plus" color="rgb(255, 255, 255)" />
        </span>
      </button>
    </div>
  );
}
