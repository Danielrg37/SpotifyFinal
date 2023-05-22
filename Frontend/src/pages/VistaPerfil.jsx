import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/perfil/vista_perfil.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';
import BarraBusqueda from './BarraBusquedaGlobal';
import Loader from './Loader';
import axios from 'axios';
import { useRef } from 'react';
import BarraNav from './BarraNav';


function VistaPerfil() {
    const [artistInfo, setArtistInfo] = useState(null);
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const [topArtistas, setTopArtistas] = useState([]);
    const [historial, setHistorial] = useState([]);



    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    }, []);


    useEffect(() => {
        if (token) {
            fetch(`http://localhost:5120/Perfil`,	
                {
                    method: "GET", headers:
                {
                    'X-Access-Token': localStorage.getItem('token'),
                    'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
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



    const [topCanciones, setTopCanciones] = useState([]);
    
    
    useEffect(() => {
      if (token) {
        fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${tiempo}&limit=20`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(response => response.json())
          .then(data => {
            setTopCanciones(data.items);
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
            fetch("http://localhost:5120/HistorialR", {
                method: "GET",
                headers: {
                    'X-Access-Token': localStorage.getItem('token'),
                    "Origin": "http://localhost:5173"
                }
            })
                .then(response => response.json())
                .then(data => setHistorial(data.items));

        }
    }, [token]); 
 
    const nombreUser = userData?.display_name;

    console.log("La petición se ha realizado.");
    console.log(`Bearer ${token}`);
 


    console.log(userData); // muestra toda la información del usuario
    console.log(historial);
    console.log(topArtistas);
    console.log(topCanciones);

 
        const iconsContainerRef = useRef(null);

        const iconsContainerRef2 = useRef(null);
      
        const moverIconos1 = (direccion) => {
          const container = iconsContainerRef.current;
          const scrollCantidad = 275; // Adjust this value based on your desired scroll distance
      
          if (direccion === 'left') {
            container.scrollLeft -= scrollCantidad;
          } else if (direccion === 'right') {
            container.scrollLeft += scrollCantidad;
          }
        };

         
        const moverIconos2 = (direccion) => {
            const container = iconsContainerRef2.current;
            const scrollCantidad = 275; // Adjust this value based on your desired scroll distance
      
          if (direccion === 'left') {
            container.scrollLeft -= scrollCantidad;
          } else if (direccion === 'right') {
            container.scrollLeft += scrollCantidad;
          }
        };
    

    

    return (
        !userData ? (
            <Loader />
        ) : (
          <div className="container">
            <BarraNav />


      
            <div className="perfil-container">
              <div className="row">
                <div className="col-4">
                  <img src={userData?.images?.[0]?.url} alt="Artista 1" className="img-fluid rounded-circle" />
                </div>
                <div className="col-8">
                  <h1>{nombreUser}</h1>
                  <a href="https://www.spotify.com/"><img src="https://cdn.iconscout.com/icon/free/png-256/spotify-11-432546.png" alt="Spotify" width="50" height="50" /></a>
                </div>
              </div>
      
              <div className="row mt-4">
                <div className="col-4">
                  <button className={`btn btn-outline-success rounded-pill w-100 ${tiempo === 'short_term' && 'active'}`}
                    onClick={() => handleTiempoChange('short_term')}>
                    Corto plazo
                  </button>
                </div>
      
                <div className="col-4">
                  <button className={`btn btn-outline-success rounded-pill w-100 ${tiempo === 'medium_term' && 'active'}`}
                    onClick={() => handleTiempoChange('medium_term')}>
                    Medio plazo
                  </button>
                </div>
      
                <div className="col-4">
                  <button className={`btn btn-outline-success rounded-pill w-100 ${tiempo === 'long_term' && 'active'}`}
                    onClick={() => handleTiempoChange('long_term')}>
                    Largo plazo
                  </button>
                </div>
              </div>
            </div> {/* closing tag for perfil-container */}
      


            <div className="row mt-5">
                <div className="col">
                    <h1>Top Canciones</h1>
                </div>
                <div className="col-auto">
                    <Link to={`/totalCanciones`}> <button className="btn btn-outline-success rounded-pill w-100" style={{height: '40px'}}> {'Ver más'} </button> </Link>
                </div>
                <div className="col-auto">
                    <ButtonGroup>
                        <button className="btn btn-outline-success rounded-pill" style={{height: '40px'}} onClick={() => moverIconos1('left')}>
                            {'>'}
                        </button>
                        <button className="btn btn-outline-success rounded-pill" style={{height: '40px'}} onClick={() => moverIconos1('right')}>
                            {'<'}
                        </button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="col-12" style={{ overflowX: 'hidden', overflowY: 'hidden', whiteSpace: 'nowrap' }}>
                <div class="gradient-container" ref={iconsContainerRef}>
                    {topCanciones.map((cancion, index) => (
                        <div key={index} className="d-inline-block mx-2">
                            <Link to={`/cancion/${cancion.id}`}>
                                {cancion.album && cancion.album.images && <img src={cancion.album.images[1]?.url} className="img-fluid" style={{ width: '250px', height: '230px' }} />}
                            </Link>
                            <p style={{fontSize: '22px'}}>{cancion.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="row mt-5">
                <div className="col">
                    <h1>Top Artistas</h1>
                </div>
                <div className="col-auto">
                    <Link to={`/totalArtistas`}> <button className="btn btn-outline-success rounded-pill w-100" style={{height: '40px'}}> {'Ver más'} </button> </Link>
                </div>
                <div className="col-auto">
                    <ButtonGroup>
                        <button className="btn btn-outline-success rounded-pill" style={{height: '40px'}} onClick={() => moverIconos2('left')}>
                            {'>'}
                        </button>
                        <button className="btn btn-outline-success rounded-pill" style={{height: '40px'}} onClick={() => moverIconos2('right')}>
                            {'<'}
                        </button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="col-12" style={{ overflowX: 'hidden', overflowY: 'hidden', whiteSpace: 'nowrap', height: '300px' }}>

  <div className="gradient-container" ref={iconsContainerRef2} >
                    {topArtistas.map((artista, index) => (
                        <div key={index} className="d-inline-block mx-2">
                            <Link to={`/artista/${artista.id}`}>
                                {artista.images && <img src={artista.images[1]?.url} alt={`Canción ${index}`} className="img-fluid rounded-circle" style={{ width: '250px', height: '230px' }} />}
                            </Link>
                            <p style={{fontSize: '22px'}}>{artista.name}</p>
                        </div>
                    ))}
                </div>
            </div>


            <div className="row mt-5">
                <div id="tabla">
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
                                               onClick={() => navigate(`/cancion/${item.track.id}`)}
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
            </div>
            <footer>
                <p class="float-end"><a href="#">Back to top</a></p>
                <p>Placeholder <a href="#">Placeholder</a> · <a href="#"></a></p>

            </footer>
        </div>
    ));
};



export default VistaPerfil;
