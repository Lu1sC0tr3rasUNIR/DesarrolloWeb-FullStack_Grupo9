import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <nav className="navbar-component">
      <Link to="/home">Inicio</Link>
    </nav>
  );
}
