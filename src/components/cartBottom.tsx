import useLocalStorage from "@/hooks/useLocalStorage";
import Icons from "./icons";

export default function CartBottom() {
  const { activeCart, setCartStatus, cart } = useLocalStorage();
  const cartCount = cart.size;

  return (
    <div className="cart-bottom" onClick={setCartStatus}>
      <div className="cart-bottom__icon-wrapper">
        <Icons name="cart" color="rgb(255, 255, 255)" />
        {cartCount > 0 && <span className="cart-bottom__badge">{cartCount}</span>}
      </div>
    </div>
  );
}
