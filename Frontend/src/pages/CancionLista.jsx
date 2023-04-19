import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function CancionLista() {
  const navigate = useNavigate(); // Agrega esta línea para utilizar el hook de navegación

  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          Placeholder
        </a>
      </header>

      <div className="p-5 mb-4 rounded-3" id="containers_info">
        <div className="mb-3">
          <h4>Genera una playlist en base a la canción seleccionada</h4>

          {/* Cierra el componente SearchBar */}
        <SearchBar />
        </div>
        {/* Cierra el div del input de búsqueda */}
        <div style={{ textAlign: 'center' }}>
          <Button className="green-color" style={{ width: '8rem', height: '3rem', justifyContent: 'center' }} onClick={() => navigate('/')}>
            Placeholder
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CancionLista;

