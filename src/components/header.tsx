import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";
import Input from "./input";
import useCart from "@/hooks/useCart";

type HeaderProps = {
  children?: ReactNode;
  className?: string;
};

export default function Header({ children, className = "" }: HeaderProps) {
  const { isAuthenticated } = useAuth();
  const { filter, addFilter } = useCart();

  if (!isAuthenticated) {
    return <div />;
  }

  return (
    <header className={`header-component ${className}`}>
      <div className="header-component-top">
        <div className="header-component-top_logo">
          <p>Relatos de Papel</p>
        </div>
        <div className="header-component-top_search_bar">
          <Input 
          //label="Text" 
          icon="lupa" 
          type="text" placeholder="Buscar..." 
          value={filter}
          onChange={(e) => addFilter(e.target.value)}
          />
        </div>
        <div className="header-component-top_user">
          <p>Usuario</p>
        </div>
      </div>
      <div className="header-component-bottom">{children}</div>
    </header>
  );
}
