import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/registro.css";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí podrías hacer la llamada a tu API para enviar los datos del formulario
    console.log(`Nombre: ${nombre}, Apellido: ${apellido}, Nombre de usuario: ${nombreUsuario}, Contraseña: ${contrasena}`);
    navigate("/");
  };

  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          Placeholder
        </a>
      </header>

      <div className="p-5 mb-4 rounded-3" id="containers_info">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="apellido" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              className="form-control"
              id="apellido"
              value={apellido}
              onChange={(event) => setApellido(event.target.value)}
              required
            />
          </div>
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
    </div>
  );
}

export default Registro;
