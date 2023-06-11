
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/registro/registro.css";
import BarraNav from "./BarraNav";
import Footer from "./Footer";

function Registro() {

  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [correo, setCorreo] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5120/usuarios/usuarios/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "http://localhost:5173",
      },
      body: JSON.stringify({
        nombreUsuario: nombreUsuario,
        contraseña: contrasena,
        email: correo,
      }),
    })
  };

  return (
    <div className="container">
      <BarraNav />

      <div className="p-5 mb-4 rounded-3 registro-container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombreUsuario" className="form-label">
              Nombre de usuario
            </label>
            <input
              type="text"
              className="form-control"
              id="nombreUsuario"
              value={nombreUsuario}
              onChange={(event) => setNombreUsuario(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="contrasena"
              value={contrasena}
              onChange={(event) => setContrasena(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={correo}
              onChange={(event) => setCorreo(event.target.value)}
              required
            />
          </div>

          <div style={{ textAlign: 'center' }}>
            <Button className="green-color" style={{ width: '8rem', height: '3rem', justifyContent: 'center' }} type="submit">
              Registro
            </Button>
          </div>
        </form>
      </div>
      <div className="row mt-5">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Registro;
