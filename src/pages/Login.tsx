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
    <div className="login">
      <div className="login__shell">
        <div className="login__form">
          <div className="login__logo">
            <h1>Relatos de Papel</h1>
            <p className="login__small-text">Tu librería de historias inolvidables</p>
          </div>
          <div className="login__inputs">
            <div className="login__inputs-title">
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
          <div className="login__forgot-password">
            <Checkbox
              label="Recuérdame"
              checked={checked}
              onChange={handleCheckboxChange}
            />
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
          <div className="login__buttons">
            <Button label="Iniciar sesión" variant="primary" />
            <Button label="Registrarse" variant="success" />
          </div>
        </div>

      <aside className="login__aside">
        <img
          className="login__aside-image"
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80"
          alt="Estantería de libros en una librería"
        />
        <div className="login__aside-overlay" />
        <div className="login__aside-content">
          <p className="login__aside-quote">
            "Un libro es un sueño que tienes en tus manos. Encuentra tu próxima
            historia en Relatos de Papel."
          </p>
          <p className="login__aside-author">— Relatos de Papel</p>
        </div>
      </aside>
      </div>
    </div>
  );
}
