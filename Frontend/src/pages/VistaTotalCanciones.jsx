
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/tops/topx.css';

import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import BarraNav from './BarraNav';
import Footer from './Footer';
import Error404 from './Error404';
import Loader from './Loader';


function VistaTotalCanciones() {

    if(!localStorage.getItem('nombreUsuario')){
        return <Error404 />;
      }


    const [topCanciones, setTopCanciones] = useState([]);

    const token = sessionStorage.getItem('token');


    let [tiempo, setTiempo] = useState('short_term');

    const handleTiempoChange = (nuevoTiempo) => { setTiempo(nuevoTiempo); };


    useEffect(() => {
        if (token) {
       fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/TopC?tiempo=${tiempo}`,
            {
                method: "GET",
                    headers: {
                        'X-Access-Token': sessionStorage.getItem('token'),
                        'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
                    }
                }
            ).then(response => response.json())
            .then(data => {
                setTopCanciones(data.items);
            });
        }
    }, [token, tiempo]);

    return (
        <div className="container">
            <BarraNav />

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




<div className="row mt-5">
            <Footer />
        </div>
        </div>
    );
}

export default VistaTotalCanciones;
