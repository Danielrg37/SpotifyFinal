import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";


function VistaArtistaP() {
    const [recomendaciones, setRecomendaciones] = useState([]);
    const [token, setToken] = useState("");
    const [artista, setArtista] = useState("");



  

   




  return (
    <div class="container">
        <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                Placeholder
            </a>
            <ul class="nav nav-pills">
                <Button className="green-color" onClick={() => navigate('/registro')}>
                    Placeholder
                </Button>
            </ul>

        </header>

        <div className="containers_info">
            <div class="row">
               <h1>Buscador para crear playlists en función a artista</h1>
            </div>
        </div>

        
       

        <footer>
            <p class="float-end"><a href="#">Back to top</a></p>
            <p>Placeholder <a href="#">Placeholder</a> · <a href="#"></a></p>

        </footer>
    </div>
);
}

export default VistaArtistaP;
