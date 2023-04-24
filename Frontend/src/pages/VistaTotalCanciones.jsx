
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/tops/topx.css';

import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function VistaTotalCanciones() {

    const [topCanciones, setTopCanciones] = useState([]);

    const token = localStorage.getItem('token');


    let [tiempo, setTiempo] = useState('short_term');

    const handleTiempoChange = (nuevoTiempo) => { setTiempo(nuevoTiempo); };



    useEffect(() => {
        if (token) {
            fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${tiempo}&limit=51`,
                {
                    method: "GET", headers:
                    {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(response => response.json())
                .then(data => {
                    setTopCanciones(data.items);// Revisa la respuesta completa del endpoint setTopArtistas(data.items); // Extrayendo los artistas de la respuesta 
                });
        }
    }, [token, tiempo]);

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
                <div className="col-12 mb-4">
                    <div className="bg-light rounded-pill p-3 d-flex justify-content-between">
                        <button
                            className={`btn btn-outline-success rounded-pill ${tiempo === 'short_term' && 'active'}`}
                            onClick={() => handleTiempoChange('short_term')}
                        >
                            Corto plazo
                        </button>
                        <button
                            className={`btn btn-outline-success rounded-pill ${tiempo === 'medium_term' && 'active'}`}
                            onClick={() => handleTiempoChange('medium_term')}
                        >
                            Medio plazo
                        </button>
                        <button
                            className={`btn btn-outline-success rounded-pill ${tiempo === 'long_term' && 'active'}`}
                            onClick={() => handleTiempoChange('long_term')}
                        >
                            Largo plazo
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
  {topCanciones.map((cancion, index) => (
   <div key={index} className="col-lg-3 col-md-6 col-sm-12 mt-5">
      <Link to={`/cancion/${cancion.id}`} className="d-block position-relative custom-underline">
        <div className="img-container">
          {cancion.album && cancion.album.images && (
            <img src={cancion.album.images[1]?.url} className="img-fluid rounded" style={{ maxWidth: '100%' }} />
          )}
        </div>
        <div className="data-container bg-dark-opacity">
            <h2>{index + 1}.</h2>
          <h4 className="text-white m-0">{cancion.name}</h4>
          <small className="text-white">{cancion.artists[0].name}</small>
        </div>
      </Link>
    </div>
  ))}
</div>




            <footer className="mt-5 pt-5 border-top">
                <div className="row">
                    <div className="col-6">
                        <p>Placeholder</p>
                    </div>
                    <div className="col-6">
                        <p className="float-end"><a href="#">Back to top</a></p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default VistaTotalCanciones;
