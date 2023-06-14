import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/registro/registro.css";
import BarraNav from "./BarraNav";


function Login() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Obtener todos los usuarios del backend
      const response = await fetch("http://localhost:5120/usuarios/usuarios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const usuarios = await response.json();

        // Verificar si el usuario existe en la lista
        const usuarioValido = usuarios.find(
          (usuario) =>
            usuario.nombreUsuario === nombreUsuario && usuario.contraseña === contrasena
        );

        if (usuarioValido) {
          // Las credenciales son válidas
          console.log("¡Inicio de sesión exitoso!");

          localStorage.setItem("nombreUsuario", nombreUsuario);
          setShowModal(true); // Mostrar el modal
          setTimeout(() => {
            setShowModal(false); // Ocultar el modal después de 2 segundos
            navigate("/"); // Redireccionar a la página principal
          }, 2000);
        } else {
          // Las credenciales son inválidas
          console.log("¡Nombre de usuario o contraseña incorrectos!");
        }
      } else {
        console.log("Error al obtener la lista de usuarios");
      }
    } catch (error) {
      console.error("Error al realizar la verificación de inicio de sesión:", error);
    }
  };

  return (
    
    <div className="container">
      <BarraNav />
   
      <div className="p-5 mb-5 rounded-6 registro-container mt-5">
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
          <div style={{ textAlign: "center" }}>
            <button
              className="btn btn-outline-success rounded-pill"
              style={{ width: "25em", height: "3rem", justifyContent: "center", marginTop: "1rem" }}
              type="submit"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
     
      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Inicio de sesión exitoso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¡Usuario logueado correctamente!</p>
        </Modal.Body>
      </Modal>
    </div>
  
  );
}

export default Login;
