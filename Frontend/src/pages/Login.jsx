import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/registro/registro.css";
import BarraNav from "./BarraNav";
import Footer from "./Footer";
import { useEffect } from "react";

function Login() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

   
    console.log(`Nombre de usuario: ${nombreUsuario}, Contraseña: ${contrasena}`);
    navigate("/");
  };

  useEffect(() => { 
    fetch(`http://localhost:5120/usuarios`, {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

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
          <div style={{ textAlign: 'center' }}>
            <Button className="green-color" style={{ width: '8rem', height: '3rem', justifyContent: 'center' }} onClick={() => navigate('/')}>
              Placeholder
            </Button>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Login;
