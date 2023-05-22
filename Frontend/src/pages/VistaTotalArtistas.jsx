
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/artista/vista_artista.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function VistaTotalArtistas() {

    const [topArtistas, setTopArtistas] = useState([]);

    const token = localStorage.getItem('token');


    let [tiempo, setTiempo] = useState('short_term');

    const handleTiempoChange = (nuevoTiempo) => { setTiempo(nuevoTiempo); };




    
     useEffect(() => {
        if (token) {
       fetch(`http://localhost:5120/TopArtistas?tiempo=${tiempo}`,
            {
                method: "GET", 
                    headers: {
                        'X-Access-Token': localStorage.getItem('token'),
                        'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
                    }
                }
            ).then(response => response.json())
            .then(data => {
                setTopArtistas(data.items);
            });
        }   
    }, [token, tiempo]);



    console.log(topArtistas);

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
            


                <div className="row">
  {topArtistas.map((artista, index) => (
   <div key={index} className="col-lg-3 col-md-6 col-sm-12 mt-5">
      <Link to={`/artista/${artista.id}`} className="d-block position-relative custom-underline">
        <div className="img-container">
            {artista.images && (
            <img src={artista.images[1]?.url} className="img-fluid rounded" style={{height: '280px', width: '280px'}} />
          )}
        </div>
        <div className="data-container bg-dark-opacity">
            <h2>{index + 1}.</h2>
          <h4 className="text-white m-0">{artista.name}</h4>
        </div>
      </Link>
    </div>
    ))}
</div>


       




            </div>



            <footer>
                <p class="float-end"><a href="#">Back to top</a></p>
                <p>Placeholder <a href="#">Placeholder</a> · <a href="#"></a></p>

            </footer>
        </div >
    );
}

export default VistaTotalArtistas;
