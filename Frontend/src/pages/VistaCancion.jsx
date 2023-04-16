import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/vista_cancion.css';
import { useNavigate } from 'react-router-dom';

function VistaCancion() {
    const [token, setToken] = useState(null);
    const [isRequestDone, setIsRequestDone] = useState(false);
    const [cancion, setCancion] = useState({});

    function milisegundosAMinutosSegundos(milisegundos) {
        let minutos = Math.floor(milisegundos / 60000);
        let segundos = ((milisegundos % 60000) / 1000).toFixed(0);
        return minutos + ":" + (segundos < 10 ? '0' : '') + segundos;
      }

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
                    fetch(`
                        https://api.spotify.com/v1/tracks/5PHEToa3yWlCiagig8MFE9?si=c14fd7cce6ec4d59`, {
                            method: "GET",
                            headers: {
                                "Authorization": `Bearer ${data.access_token}`
                            }
                        })
                        .then(response => response.json())
                        .then(data => setCancion(data))
                        .catch(error => console.error(error));
                })
                .catch(error => console.error(error));
            
            setIsRequestDone(true);
        }
    }, [isRequestDone]);
    



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
                    <img src={cancion.album?.images?.[1]?.url} alt="Artista 1" className="img-fluid" />
                </div>
                <div className="col-8">
                    <h1>{cancion.artists?.[0]?.name}</h1>
                    <h2>{cancion.name}</h2>
                    <a href="https://www.spotify.com/"><img src="https://cdn.iconscout.com/icon/free/png-256/spotify-11-432546.png" alt="Spotify" width="50" height="50" /></a>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-4 text-center">
                    <h4>Veces reproducida</h4>
                    <p>Placeholder</p>
                </div>
                <div class="col-md-4 text-center">
                    <h4>Duración</h4>
                    <p>Duración: {milisegundosAMinutosSegundos(cancion.duration_ms)}</p>
                </div>
                <div class="col-md-4 text-center">
                    <h4>Tiempo total de reproducción</h4>
                    <p>Placeholder horas</p>
                </div>
            </div>
            <div class="row mt-3">
                <h1>Aparece en</h1>
                <div className="col-12" style={{ overflowX: 'scroll', whiteSpace: 'nowrap', height: '300px' }}>
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="d-inline-block mx-2">
                            <img src="https://via.placeholder.com/150x150" alt={`Canción ${index}`} className="img-fluid" />
                            <p>Canción {index}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div class="row mt-5">
            <div class="col-6 ml-2" style={{border: '2px solid green'}}>
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
            <td><img src="https://via.placeholder.com/50x50" alt="Imagen de la canción"></img></td>
            <td>Canción</td>
            <td>3:24</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div class="col-4" style={{border: '2px solid red'}}>
    <h2>Letra</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nihil molestias qui ducimus laboriosam? Sit eaque consequuntur eveniet, unde quia at, tempora voluptatem, delectus maiores asperiores dignissimos in odio magnam!</p>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum, ratione odit. Iste ad nihil eligendi molestiae assumenda delectus magnam minima odio culpa repudiandae omnis officia exercitationem, vel rem veniam ratione!</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem doloremque veniam sint ipsum alias, quibusdam quod porro accusamus enim quasi inventore aliquid et dolor repellat dicta voluptate dolorem nulla quo?</p>
  </div>
</div>


            <footer>
                <p class="float-end"><a href="#">Back to top</a></p>
                <p>Placeholder <a href="#">Placeholder</a> · <a href="#"></a></p>

            </footer>
        </div>
    );
}

export default VistaCancion;
