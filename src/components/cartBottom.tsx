import useLocalStorage from "@/hooks/useLocalStorage";
import Icons from "./icons";

export default function CartBottom() {
  const { activeCart, setCartStatus } = useLocalStorage();
  return (
    <div className="cart-bottom-container" onClick={setCartStatus}>
      <Icons name="cart" color="rgb(255, 255, 255)" />
    </div>
  );
}
