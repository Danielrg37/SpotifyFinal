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

        console.log(usuarios);

        // Verificar si el usuario existe en la lista
        const usuarioValido = usuarios.find(
          (usuario) =>
            usuario.nombreUsuario === nombreUsuario && usuario.contraseña === contrasena
        );

        if (usuarioValido) {
          // Las credenciales son válidas
          console.log("¡Inicio de sesión exitoso!");
          navigate("/");
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
          <div style={{ textAlign: "center" }}>
            <Button
              className="green-color"
              style={{ width: "8rem", height: "3rem", justifyContent: "center" }}
              type="submit"
            >
              Iniciar sesión
            </Button>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Login;
