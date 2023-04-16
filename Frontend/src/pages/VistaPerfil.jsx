import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/vista_perfil.css';
import { useNavigate } from 'react-router-dom';

function VistaPerfil() {
    const [artistInfo, setArtistInfo] = useState(null);
    const [token, setToken] = useState(null);
    const [isRequestDone, setIsRequestDone] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    

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
                });
        }
    }, [isRequestDone]);

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
            fetch('https://api.spotify.com/v1/users/King_KS', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(response => response.json())
                .then(data => setUserData(data));
        }
    }, [token]);


    
    


    console.log("La petición se ha realizado.");
    console.log(`Bearer ${token}`);

    if (!artistInfo || !userData) {
        return <div>Loading...</div>;
    }

    console.log(userData); // muestra toda la información del usuario
    console.log(userData.display_name); // muestra el nombre de usuario
   

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
                    <img src={userData?.images?.[1]?.url} alt="Artista 1" className="img-fluid rounded-circle" />
                </div>
                <div className="col-8">
                    <h2>{userData.display_name}</h2>
                    <a href="https://www.spotify.com/"><img src="https://cdn.iconscout.com/icon/free/png-256/spotify-11-432546.png" alt="Spotify" width="50" height="50" /></a>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <h1>Top X</h1>
                </div>
                <div className="col-auto">
                    <Button> {'>'} </Button>
                </div>
                <div className="col-auto">
                    <Button> {'<'} </Button>
                </div>
            </div>
            <div className="col-12" style={{ overflowX: 'scroll', whiteSpace: 'nowrap', height: '300px' }}>
                {[...Array(20)].map((_, index) => (
                    <div key={index} className="d-inline-block mx-2">
                        <Link to={{
                            pathname: "/cancion",
                            state: { token: token }
                        }}>
                            <img src="https://via.placeholder.com/150x150" alt={`Canción ${index}`} className="img-fluid rounded-circle" />
                        </Link>
                        <p>Canción {index}</p>
                    </div>
                ))}
            </div>

            <div className="row mt-5">
                <div className="col">
                    <h1>Top X</h1>
                </div>
                <div className="col-auto">
                    <Button> {'>'} </Button>
                </div>
                <div className="col-auto">
                    <Button> {'<'} </Button>
                </div>
            </div>
            <div className="col-12" style={{ overflowX: 'scroll', whiteSpace: 'nowrap', height: '300px' }}>
                {[...Array(20)].map((_, index) => (
                    <div key={index} className="d-inline-block mx-2">
                        <Link to="/artista">
                            <img src="https://via.placeholder.com/150x150" alt={`Canción ${index}`} className="img-fluid rounded-circle" />
                        </Link>
                        <p>Artista {index}</p>

                    </div>
                ))}
            </div>


            <div class="row mt-5">
                <div class="col-12 ml-2" style={{ border: '2px solid green' }}>
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

export default VistaPerfil;
