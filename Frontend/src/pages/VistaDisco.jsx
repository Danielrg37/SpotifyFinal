
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/disco/vista_disco.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function VistaDisco() {

    const [disco, setDisco] = useState([]);
    const [cancionesDisco, setCancionesDisco] = useState([]);
    const [url, setUrl] = useState(``);

    const token = localStorage.getItem('token');

    const { id } = useParams();

    useEffect(() => {
        if (token) {
            fetch(`https://api.spotify.com/v1/albums/${id}?si=c14fd7cce6ec4d59`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(
                    (data) => {
                        setDisco(data)
                        const baseUrl = "https://www.amazon.es/s?k=";
                        const searchQuery = `${data.artists[0].name}+${disco.name}`.replace(/ /g, "+");
                        const url = baseUrl + searchQuery;
                        setUrl(url)
                    })
                .catch(error => console.error(error));
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            fetch(`https://api.spotify.com/v1/albums/${id}/tracks?si=c14fd7cce6ec4d59`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => setCancionesDisco(data.items))
                .catch(error => console.error(error));
        }
    }, [token]);

    console.log(disco);
    const embedUrl = `https://open.spotify.com/embed/album/${id}`;
    console.log(url);

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

            <div className="cancion-container">
                <div className="row">
                    <div className="col-4">
                        <img src={disco?.images?.[1]?.url} alt="Artista 1" className="img-fluid" />
                    </div>
                    <div className="col-8">
                        <h2>
                            {disco.artists && disco.artists.length > 0 &&
                                <span>
                                    {disco.artists.map((artista) => (
                                        <Link key={artista.id} className="custom-underline" to={`/artista/${artista.id}`}>
                                            {artista.name}
                                        </Link>
                                    )).reduce((prev, curr) => [prev, ", ", curr])}
                                </span>
                            }
                        </h2>

                        <h1>{disco.name}</h1>
                        {/* // Añadir url */}
                        {url !== null && <Button href={url} className="green-color mt-2">Compra en Amazon</Button>}

                    </div>
                </div>
            </div>

            <div className='disco-container mt-3'>
                <div class="row mt-3">
                    <h1>Canciones que pertenecen al disco</h1>
                    <div className="col-12" style={{ overflowX: 'scroll', whiteSpace: 'nowrap', height: '300px' }}>
                        {cancionesDisco.map((cancion, index) => (
                            <div key={index} className="d-inline-block mx-2">
                                <Link to={`/cancion/${cancion.id}`}>
                                    <img src={disco?.images?.[1]?.url} alt={`Canción ${index}`} className="img-fluid" width="250" height="250" />

                                    <p>{cancion.name}</p>
                                </Link>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
            <div class="row mt-5 mb-3">
                <div class="col-6 canciones-container">
                    <h1>Placeholder</h1>
                </div>

                <div class="col-6 canciones-container">
                    <h1>Placeholder</h1>
                    <iframe
                        id="spotify-iframe"
                        src={embedUrl}
                        width="100%"
                        height="500"
                        frameBorder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                    />
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

