import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import Input from "@/components/input";
import { useState } from "react";

export default function Login() {
  const [checked, setChecked] = useState(false);

  function handleCheckboxChange() {
    setChecked(!checked);
  }

  return (
    <div className="login-page">
      <div className="login-shell">
        <div className="login-form">
          <div className="login-logo">
            <h1>Relatos de Papel</h1>
            <p className="small-text">Tu librería de historias inolvidables</p>
          </div>
          <div className="login-inputs">
            <div className="login-inputs_titulo">
              <h2>Iniciar sesión</h2>
            </div>
            <Input
              label="Correo electrónico"
              placeholder="Ingresa tu correo electrónico"
            />
            <Input
              label="Contraseña"
              type="password"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <div className="login-inputs_forgot-password">
            <Checkbox
              label="Recuérdame"
              checked={checked}
              onChange={handleCheckboxChange}
            />
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
          <div className="login-buttons">
            <Button label="Iniciar sesión" variant="primary" />
            <Button label="Registrarse" variant="success" />
          </div>
        </div>

      <aside className="login-aside">
        <img
          className="login-aside-image"
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80"
          alt="Estantería de libros en una librería"
        />
        <div className="login-aside-overlay" />
        <div className="login-aside-content">
          <p className="login-aside-quote">
            "Un libro es un sueño que tienes en tus manos. Encuentra tu próxima
            historia en Relatos de Papel."
          </p>
          <p className="login-aside-author">— Relatos de Papel</p>
        </div>
      </aside>
      </div>
    </div>
  );
}
