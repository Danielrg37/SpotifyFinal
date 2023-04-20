
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/vista_artista.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function VistaTotalCanciones() {

    const [topCanciones, setTopCanciones] = useState([]);
    
    const token = localStorage.getItem('token');

    
    let [tiempo, setTiempo] = useState('short_term');

    const handleTiempoChange = (nuevoTiempo) => { setTiempo(nuevoTiempo); };



    useEffect(() => {
        if (token) {
            fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${tiempo}&limit=60`,
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
                
               
            <div className="col-4">
                    <button
                        className={`btn btn-outline-success rounded-pill w-100 ${tiempo === 'short_term' && 'active'}`}
                        onClick={() => handleTiempoChange('short_term')}
                    >
                        Corto plazo
                    </button>
                </div>


                <div className="col-4">
                    <button
                        className={`btn btn-outline-success rounded-pill w-100 ${tiempo === 'medium_term' && 'active'}`}
                        onClick={() => handleTiempoChange('medium_term')}
                    >
                        Medio plazo
                    </button>
                </div>



                <div className="col-4">
                    <button
                        className={`btn btn-outline-success rounded-pill w-100 ${tiempo === 'long_term' && 'active'}`}
                        onClick={() => handleTiempoChange('long_term')}
                    >
                        Largo plazo
                    </button>
                </div>
                </div>


        
            <div className='row mt-5'>
            {topCanciones.map((cancion, index) => (
                    <div key={index} className="col-3">
                         <Link to={`/cancion/${cancion.id}`}>
                         {cancion.album && cancion.album.images && <img src={cancion.album.images[1]?.url} className="img-fluid" style={{width: '250px', height: '250px'}} />}
                        </Link>
                        <h4>{cancion.name}</h4>
                    </div>
                ))}
            </div>


          
            <footer>
                <p class="float-end"><a href="#">Back to top</a></p>
                <p>Placeholder <a href="#">Placeholder</a> · <a href="#"></a></p>

            </footer>
        </div>
    );
}

export default VistaTotalCanciones;
