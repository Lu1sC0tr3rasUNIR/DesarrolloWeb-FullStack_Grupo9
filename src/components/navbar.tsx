import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/home" className="navbar__link">Inicio</Link>
      <Link to="/categorias" className="navbar__link">Categorias</Link>
      <Link to="/libros" className="navbar__link">Libros</Link>
      <Link to="/components" className="navbar__link">Component</Link>
    </nav>
  );
}
