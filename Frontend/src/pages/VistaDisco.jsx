
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/vista_artista.css';
import { useNavigate } from 'react-router-dom';

function VistaDisco({ albumId, accessToken }) {

    const [albumData, setAlbumData] = useState({});

    useEffect(() => {
        fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(data => setAlbumData(data))
            .catch(error => console.error(error));
    }, [albumId, accessToken]);

    
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
                    <img src="https://via.placeholder.com/300x300" alt="Artista 1" className="img-fluid rounded-circle" />
                </div>
                <div className="col-8">
                    <h1>Nombre Disco</h1>
                    <a href="https://www.spotify.com/"><img src="https://cdn.iconscout.com/icon/free/png-256/spotify-11-432546.png" alt="Spotify" width="50" height="50" /></a>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-4 text-center" id="datos">
                    <h4>Veces reproducido</h4>
                    <p>Placeholder</p>
                </div>
                <div class="col-md-4 text-center" id="datos">
                    <h4>Tiempo total de reproducci�n</h4>
                    <p>Placeholder horas</p>
                </div>
                <div class="col-md-4 text-center" id="datos">
                    <h4>�ltima vez escuchado</h4>
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
                                <th>Canci�n</th>
                                <th>Hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(10)].map((_, i) => (
                                <tr key={i}>
                                    <td><img src="https://via.placeholder.com/50x50" alt="Imagen de la canci�n"></img></td>
                                    <td>Canci�n</td>
                                    <td>3:24</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>






            <footer>
                <p class="float-end"><a href="#">Back to top</a></p>
                <p>Placeholder <a href="#">Placeholder</a> � <a href="#"></a></p>

            </footer>
        </div>
    );
}

export default VistaDisco;


//return (
//    <div>
//        <h1>{albumData.name}</h1>
//        <img src={albumData.images?.[0].url} alt={`Cover art for ${albumData.name}`} />
//        <p>{albumData.release_date}</p>
//        <p>{albumData.total_tracks} tracks</p>
//        {/* Aqu� puedes mostrar cualquier otra informaci�n que desees */}
//    </div>
//);
//}
