import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <nav className="navbar-component">
      <Link to="/home">Inicio</Link>
      <Link to="/categorias">Categorias</Link>
      <Link to="/libros">Libros</Link>
      <Link to="/components">Component</Link>
    </nav>
  );
}
