
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/vista_artista.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function VistaArtista() {


    const [artista, setArtista] = useState({});
    const [albums, setAlbums] = useState([]);
    const [canciones, setCanciones] = useState([]);


    const token = localStorage.getItem('token');
    const { id } = useParams();


    useEffect(() => {
        if (token) {
            fetch(`https://api.spotify.com/v1/artists/${id}/albums?album_type=album&si=c14fd7cce6ec4d59`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setAlbums(data.items);
                });
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setCanciones(data.tracks);
                });
        }
    }, [token]);



    useEffect(() => {
        if (token) {
            fetch(`https://api.spotify.com/v1/artists/${id}?si=c14fd7cce6ec4d59`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setArtista(data);
                });
        }
    }, [token]);
    const [concerts, setConcerts] = useState([]);



    useEffect(() => {
        const artistName = "Coldplay";
        const apiKey = "60a8f26d0fb8050912e18592eb17cdc1";
        fetch(
            `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${apiKey}&format=json`
        )
            .then((response) => response.json())
            .then((data) => {
                const concerts = data;
                setConcerts(concerts);
            })
            .catch((error) => console.error(error));
    }, [token]);



    console.log(albums);
    console.log(artista);
    console.log(canciones);
    console.log(concerts);



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
                    <img src={artista?.images?.[1]?.url} alt="Artista 1" className="img-fluid rounded-circle" />
                </div>
                <div className="col-8">
                    <h1>{artista.name}</h1>
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
                <h1>Canciones más famosas</h1>
                <div className="col-12" style={{ overflowX: 'scroll', whiteSpace: 'nowrap', height: '300px' }}>
                    {canciones.length > 0 && canciones.map((cancion, index) => (
                        <div key={index} className="d-inline-block mx-2">
                            <img src={cancion?.album?.images?.[1]?.url} alt={`Canción ${index}`} className="img-fluid" width={250} height={250} />
                            <p>{cancion.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div class="row mt-3">
                <h1>Discos</h1>
                <div className="col-12" style={{ overflowX: 'scroll', whiteSpace: 'nowrap', height: '300px' }}>
                    {albums.length > 0 && albums.map((album, index) => (
                        <div key={index} className="d-inline-block mx-2">
                            <img src={album?.images?.[1]?.url} alt={`Canción ${index}`} className="img-fluid" width={250} height={250} />
                            <p>{album.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="row mt-3">
                <div>
                    <div class="row">
                        <div class="col-md-6 text-center bg-gray" style={{ backgroundColor: '#18181C' }}>
                            <div>
                                <h1>Conciertos de Spotify</h1>
                                <iframe
                                    title="Conciertos de Spotify"
                                    src="https://open.spotify.com/artist/1rTUwYS38LkQTlT2fhikch/concerts"
                                    width="100%"
                                    height="500px"
                                    frameBorder="0"
                                    allowFullScreen
                                />
                            </div>
                        </div>

                        <div class="col-md-6 text-center bg-gray" style={{ backgroundColor: '#18181C' }}>
                            <h1 style={{ textAlign: "left" }}>Noticias</h1>

                            <h4 style={{ textAlign: "left", marginBottom: "10px" }}>Noticia 1</h4>
                            <p style={{ borderBottom: '1px solid white', marginBottom: "40px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid cupiditate aperiam cum nesciunt officia distinctio neque fugit ipsa voluptas eveniet aut voluptates laborum temporibus, magnam facilis deleniti doloremque, voluptate ab?</p>
                            <h4 style={{ textAlign: "left", marginBottom: "10px" }}>Noticia 2</h4>
                            <p style={{ borderBottom: '1px solid white', marginBottom: "40px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid cupiditate aperiam cum nesciunt officia distinctio neque fugit ipsa voluptas eveniet aut voluptates laborum temporibus, magnam facilis deleniti doloremque, voluptate ab?</p>
                            <h4 style={{ textAlign: "left", marginBottom: "10px" }}>Noticia 3</h4>
                            <p style={{ borderBottom: '1px solid white', marginBottom: "40px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid cupiditate aperiam cum nesciunt officia distinctio neque fugit ipsa voluptas eveniet aut voluptates laborum temporibus, magnam facilis deleniti doloremque, voluptate ab?</p>
                            <h4 style={{ textAlign: "left", marginBottom: "10px" }}>Noticia 4</h4>
                            <p style={{ borderBottom: '1px solid white', marginBottom: "20px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid cupiditate aperiam cum nesciunt officia distinctio neque fugit ipsa voluptas eveniet aut voluptates laborum temporibus, magnam facilis deleniti doloremque, voluptate ab?</p>

                        </div>
                    </div>
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
                                    <td><img src="https://via.placeholder.com/50x50" alt="Imagen de la canción"></img></td>
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
                <p>Placeholder <a href="#">Placeholder</a> · <a href="#"></a></p>

            </footer>
        </div>
    );
}

export default VistaArtista;
