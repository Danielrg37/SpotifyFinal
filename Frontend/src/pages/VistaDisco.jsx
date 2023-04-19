
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/vista_artista.css';
import { useNavigate } from 'react-router-dom';

function VistaDisco({ albumId, accessToken }) {

    const [token, setToken] = useState(null);
    const [isRequestDone, setIsRequestDone] = useState(false);
    const [disco, setDisco] = useState([]);
    const [cancionesDisco, setCancionesDisco] = useState([]);
   
  
    useEffect(() => {
      if (!isRequestDone) {
        fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: "grant_type=client_credentials&client_id=ff923ecf1dad4ad3b0d5e8e5ec0deaf7&client_secret=40bd84518a9c4ddbab686f0de9e55ca9"
        })
        .then(response => response.json())
        .then(data => {
          setToken(data.access_token);
          setIsRequestDone(true);
        })
        .catch(error => console.error(error));
      }   
    }, [isRequestDone]);
  
    useEffect(() => {
      if (token) {
        
        fetch("https://api.spotify.com/v1/albums/2XS5McKf3zdJWpcZ4OkZPZ?si=I3oRbc7lRBKWH1bZUgw0Iw", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
            .then(response => response.json())
            .then(data => setAlbumData(data))
            .catch(error => console.error(error));
    }
    }, [token]);

    
    return (

        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    Placeholder
                </a>

                <ul className="nav nav-pills">
                    <Button className="green-color" onClick={() => navigate('/registro')}>
                        Placeholder
                    </Button>
                </ul>
            </header>

            <div className="row">
                <div className="col-4">
                    <img src={disco?.images?.[1]?.url} alt="Artista 1" className="img-fluid" />
                </div>
                <div className="col-8">
                    <h1>{disco.name}</h1>
                    <a href="https://www.spotify.com/"><img src="https://cdn.iconscout.com/icon/free/png-256/spotify-11-432546.png" alt="Spotify" width="50" height="50" /></a>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-4 text-center" id="datos">
                    <h4>Veces reproducido</h4>
                    <p>Placeholder</p>
                </div>
                <div class="col-md-4 text-center" id="datos">
                    <h4>Tiempo total de reproducción</h4>
                    <p>Placeholder horas</p>
                </div>
                <div class="col-md-4 text-center" id="datos">
                    <h4>Última vez escuchado</h4>
                    <p>Placeholder</p>
                </div>
            </div>
            <div class="row mt-3">
                <h1>Canciones que pertenecen al disco</h1>
                <div className="col-12" style={{ overflowX: 'scroll', whiteSpace: 'nowrap', height: '300px' }}>
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="d-inline-block mx-2">
                            <img src="https://via.placeholder.com/150x150" alt={`Canci�n ${index}`} className="img-fluid" />
                            <p>Canci�n {index}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div class="row mt-5">
                <div class="col-12" style={{ border: '2px solid green' }}>
                    <h2>Mi historial de reproducciones</h2>
                    <table class="table table-responsive">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Canción</th>
                                <th>Hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(10)].map((_, i) => (
                                <tr key={i}>
                                    <td><img src="https://via.placeholder.com/50x50" alt="Imagen de la canci�n"></img></td>
                                    <td>Canción</td>
                                    <td>3:24</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>






            <footer>
                <p class="float-end"><a href="#">Back to top</a></p>
                <p>Placeholder <a href="#">Placeholder</a> <a href="#"></a></p>

            </footer>
        </div>
        
    );

}

export default VistaDisco;



// Código prueba, no hacer caso
//return (
//    <div>
//        <h1>{albumData.name}</h1>
//        <img src={albumData.images?.[0].url} alt={`Cover art for ${albumData.name}`} />
//        <p>{albumData.release_date}</p>
//        <p>{albumData.total_tracks} tracks</p>
//      
//    </div>
//);
//}
