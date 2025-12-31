import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";
import Input from "./input";
import Icons from "./icons";
import useFilter from "@/hooks/useFilter";

type HeaderProps = {
  children?: ReactNode;
  className?: string;
};

export default function Header({ children, className = "" }: HeaderProps) {
  const { isAuthenticated } = useAuth();
  const { filter, addFilter } = useFilter();

  if (!isAuthenticated) {
    return <div />;
  }

  return (
    <header className={`header ${className}`}>
      <div className="header__top">
        <div className="header__logo">
          <p>Relatos de Papel</p>
        </div>
        <div className="header__search">
          <Input 
            icon="lupa" 
            type="text" 
            placeholder="Buscar..." 
            value={filter}
            onChange={(e) => addFilter(e.target.value)}
          />
        </div>
        <div className="header__user">
          <Icons name="user" />
          <p>Usuario</p>
        </div>
      </div>
      <div className="header__bottom">{children}</div>
    </header>
  );
}
