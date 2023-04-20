import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/vista_perfil.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';

function VistaPerfil() {
    const [artistInfo, setArtistInfo] = useState(null);
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const [topArtistas, setTopArtistas] = useState([]);
    const [topCanciones, setTopCanciones] = useState([]);
    const [historial, setHistorial] = useState([]);



    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    }, []);


    useEffect(() => {
        if (token) {
            fetch('https://api.spotify.com/v1/me',
                {
                    method: "GET", headers:
                    {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(response => response.json())
                .then(data => {
                    console.log(data);
                    setUserData(data);
                    // Revisa la respuesta completa del endpoint setTopArtistas(data.items); // Extrayendo los artistas de la respuesta 
                });
        }
    }, [token]);

    let [tiempo, setTiempo] = useState('short_term');

    const handleTiempoChange = (nuevoTiempo) => { setTiempo(nuevoTiempo); };



    useEffect(() => {
        if (token) {
            fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${tiempo}&limit=20`,
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




    useEffect(() => {
        if (token) {
            fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${tiempo}&limit=20`,
                {
                    method: "GET", headers:
                    {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(response => response.json())
                .then(data => {
                    setTopArtistas(data.items);// Revisa la respuesta completa del endpoint setTopArtistas(data.items); // Extrayendo los artistas de la respuesta 
                });
        }
    }, [token, tiempo]);


    useEffect(() => {
        if (token) {
            fetch("https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => setArtistInfo(data));
        }
    }, [token]);


    useEffect(() => {
        if (token) {
            fetch("https://api.spotify.com/v1/me/player/recently-played?limit=50", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setHistorial(data.items);
                });
        }
    }, [token]);




    const nombreUser = userData?.display_name;

    console.log("La petición se ha realizado.");
    console.log(`Bearer ${token}`);



    console.log(userData); // muestra toda la información del usuario
    console.log(topArtistas);
    console.log(topCanciones);

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
                    <img src={userData?.images?.[0]?.url} alt="Artista 1" className="img-fluid rounded-circle" />
                </div>
                <div className="col-8">
                    <h2>{nombreUser}</h2>
                    <a href="https://www.spotify.com/"><img src="https://cdn.iconscout.com/icon/free/png-256/spotify-11-432546.png" alt="Spotify" width="50" height="50" /></a>
                </div>
            </div>

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


            <div className="row mt-3">
                <div className="col">
                    <h1>Top Canciones</h1>
                </div>
                <div className="col-auto">
                    <Link to={`/totalCanciones`}> <button className="btn btn-outline-success rounded-pill w-100"> {'Ver más'} </button> </Link>
                </div>
                <div className="col-auto">
                    <ButtonGroup>
                        <button className="btn btn-outline-success rounded-pill">
                            {'>'}
                        </button>
                        <button className="btn btn-outline-success rounded-pill">
                            {'<'}
                        </button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="col-12" style={{ overflowX: 'hidden', whiteSpace: 'nowrap', height: '300px' }}>
                <div class="gradient-container">
                    {topCanciones.map((cancion, index) => (
                        <div key={index} className="d-inline-block mx-2">
                            <Link to={`/cancion/${cancion.id}`}>
                                {cancion.album && cancion.album.images && <img src={cancion.album.images[1]?.url} className="img-fluid" style={{ width: '250px', height: '250px' }} />}
                            </Link>
                            <p>{cancion.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="row mt-5">
                <div className="col">
                    <h1>Top Artistas</h1>
                </div>
                <div className="col-auto">
                    <Link to={`/totalCanciones`}> <button className="btn btn-outline-success rounded-pill w-100"> {'Ver más'} </button> </Link>
                </div>
                <div className="col-auto">
                    <ButtonGroup>
                        <button className="btn btn-outline-success rounded-pill">
                            {'>'}
                        </button>
                        <button className="btn btn-outline-success rounded-pill">
                            {'<'}
                        </button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="col-12" style={{ overflowX: 'hidden', whiteSpace: 'nowrap', height: '300px' }}>
                <div class="gradient-container">
                {topArtistas.map((artista, index) => (
                        <div key={index} className="d-inline-block mx-2">
                            <Link to={`/artista/${artista.id}`}>
                            {artista.images && <img src={artista.images[1]?.url} alt={`Canción ${index}`} className="img-fluid rounded-circle" style={{ width: '250px', height: '250px' }} />}
                            </Link>
                            <p>{artista.name}</p>
                        </div>
                    ))}
                </div>
            </div>


            <div className="row mt-5">
                <div className="col-12 ml-2">
                    <h2>Mi historial de reproducciones</h2>
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Canción</th>
                                <th>Hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historial.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <img
                                            src={item.track.album.images[0].url}
                                            alt={`Imagen de ${item.track.name}`}
                                            style={{ width: 50, height: 50 }}
                                        />
                                    </td>
                                    <td>{item.track.name}</td>
                                    <td>{new Date(item.played_at).toLocaleTimeString()}</td>
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

export default VistaPerfil;
