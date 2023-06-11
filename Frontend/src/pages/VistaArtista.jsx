
import React from 'react';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/artista/vista_artista.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cheerio from 'cheerio';
import Loader from './Loader';
import Footer from './Footer';
import BarraNav from './BarraNav';


function VistaArtista() {


    const [artista, setArtista] = useState({});
    const [albums, setAlbums] = useState([]);
    const [canciones, setCanciones] = useState([]);
    const [noticias, setNoticias] = useState([]);
    const [imagenes, setImagenes] = useState([]);
    const [descripcion, setDescripcion] = useState([]);
    const [textoCortado, setTextoCortado] = useState([]);
    const [eventos, setEventos] = useState([]);

    const token = localStorage.getItem('token');
    const { id } = useParams();

useEffect(() => {
  if (token) {    
    fetch(`http://localhost:5120/ADiscos/${id}`, {
      method: 'GET',
      headers: {
        'X-Access-Token': localStorage.getItem('token'),
        'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
      }
    })
      .then(response => response.json())
      .then(data => {
        // Filter albums and EPs where the artist is the primary artist and not part of "appear on" list
        const filteredAlbums = data.items.filter(item => {
          const primaryArtists = item.artists.filter(artist => artist.type === 'artist' && artist.id === id);
          const appearOnArtists = item.artists.filter(artist => artist.type === 'artist' && artist.id !== id);
          return (
            (item.album_type === 'album' || item.album_type === 'ep') &&
            primaryArtists.length > 0 &&
            appearOnArtists.length === 0
          );
        });

        setAlbums(filteredAlbums);
      });
  }
}, [token]);

console.log(albums);

      
      
      console.log(albums);
      

    useEffect(() => {
        if (token) {
            fetch(`http://localhost:5120/ACanciones/${id}`, {
                method: 'GET',
                headers: {
                    'X-Access-Token': localStorage.getItem('token'),
                    'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
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
            fetch(`http://localhost:5120/artista/${id}?si=c14fd7cce6ec4d59`, {
                method: 'GET',
                headers: {
                    'X-Access-Token': localStorage.getItem('token'),
                    'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
                }
            })
                .then(response => response.json())
                .then(data => {
                    setArtista(data);
                });
        }
    }, [token]);

    console.log(artista.name)

    useEffect(() => {
        if(artista.name){
            fetch(`http://localhost:5120/galeria/${artista.name}`, {
                method: 'GET',
                headers: {
                    'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
                }
            })
                .then(response => response.json())
                .then(data => {
                    setImagenes(data);
                }
                )
        }
    }, [artista.name]);

    useEffect(() => {
        if (artista.name) {
          fetch(`http://localhost:5120/eventos/${artista.name}`, {
            method: 'GET',
            headers: {
              'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
            }
          })
          .then(response => response.json())
          .then(data => {
        
        
            setEventos(data);
          });
        }
      }, [artista.name]);
      

    useEffect(() => {
        async function fetchDescripcion() {
          if (artista && artista.name) {
            const url = `http://localhost:5120/descripcion/${encodeURIComponent(
              artista.name
            )}`;
            console.log(url);
      
            const response = await fetch(url, {
              headers: {
                'User-Agent':
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
              },
            });
      
            const textResponse = await response.text(); // Get the plain text response
            setDescripcion(textResponse.replace(/{"descripcion":"|"}/g, '').replace(/\\u0026quot;/g, '"'));
            // Update the state with the plain text response

          }
        }
      
        // Invoke async function to fetch the description
        fetchDescripcion();
      }, [artista.name]);

     
      const formatEvent = (evento) => {
        const [fecha, detalles, lugar, pais] = evento.split('./').map(item => item.trim());
        const [nombre, ...artistas] = detalles.split(', ');
        const formattedNombre = nombre.trim();
        return {
          fecha,
          nombre: formattedNombre,
          artistas: artistas.join(', '),
          lugar,
          pais
        };
      };
      
      

      const [UsuarioID, setUsuarioID] = useState("");
        const [CancionID, setCancionID] = useState("");
        const [ArtistaID, setArtistaID] = useState("");
        const [DiscoID, setDiscoID] = useState("");

        useEffect(() => {
            setCancionID("-");
            setArtistaID(id);
            setDiscoID("-");
          }, [id]);


      useEffect(() => {
        if (localStorage.getItem('nombreUsuario')) {
          fetch(`http://localhost:5120/usuarios/usuarios`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Origin": "http://localhost:5173",
            }
          })
          .then(response => response.json())
          .then(data => {
            const usuario = data.find(user => user.nombreUsuario === localStorage.getItem('nombreUsuario'));
            if (usuario) {
              const usuarioID = usuario.Id;
              console.log(usuarioID);
              setUsuarioID(usuarioID);
            }
          })
          .catch(error => console.error(error));
        }
      }, []);
  
      
      useEffect(() => {
        if (localStorage.getItem('nombreUsuario')) {
          fetch("http://localhost:5120/acciones/acciones_anadir", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Origin": "http://localhost:5173",
            },
            body: JSON.stringify({
              CancionID: "-",
              ArtistaID: id,
              DiscoID: "-",
              UsuarioID: UsuarioID,
              NombreUsuario: localStorage.getItem('nombreUsuario')
            }),
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => console.error(error));
        }
      }, [artista]);

    
      
    return (
        !token && !artista || !albums && !canciones && !imagenes ? (
            <Loader />
        ) : (
            <div className="container">
                <BarraNav />

                <div className='artista-container'>
                    <div className="row">
                        <div className="col-4">
                            <img src={artista?.images?.[1]?.url} alt="Artista 1" className="img-fluid rounded-circle" style={{ width: '250px', height: '250px' }} />
                        </div>
                        <div className="col-8">
                            <h1>{artista.name}</h1>
                            <p>{descripcion}</p>
                        </div>
                    </div>
                    {/* <div class="row mt-3">
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
                </div> */}
                </div>

                <div className="canciones-container mt-4 mb-4">
                    <div class="row mt-3">

                        <h1>Canciones más famosas</h1>
                        <div className="col-12" style={{ overflowX: 'scroll', overflowY: 'hidden', whiteSpace: 'nowrap', height: '320px' }}>
                             {canciones.length > 0 && canciones.map((cancion, index) => (
                                <div key={index} className="d-inline-block mx-2">
                                    <Link to={`/cancion/${cancion.id}`} className="custom-underline">
                                        <img src={cancion?.album?.images?.[1]?.url} alt={`Canción ${index}`} className="img-fluid" width={250} height={250} />
                                        <p style={{ fontSize: '22px' }}>{cancion.name}</p>
                                    </Link>
                                </div>
                            ))}  
                        </div>
                    </div>


                    <div class="row mt-3">
                        <h1>Discos</h1>
                        <div className="col-12" style={{ overflowX: 'scroll', overFlowY: 'hidden', whiteSpace: 'nowrap', height: '320px' }}>
                            {albums.length === 0 ? (
                                <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#555' }}>No hay discos</h1>
                                </div>
                            ) : (
                                <>
                                    {albums.map((album, index) => (
                                        <div key={index} className="d-inline-block mx-2">
                                            <Link to={`/disco/${album.id}`} className="custom-underline">
                                                <img src={album?.images?.[1]?.url} alt={`Canción ${index}`} className="img-fluid" width={250} height={250} />
                                                <p style={{ fontSize: '22px' }}>{album.name}</p>
                                            </Link>
                                        </div>
                                    ))}
                                </>
                            )}

                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div>
                        <div class="row">
                            <div class="col-md-6 text-center">
                                <div className='fotos-container'>
                                    <div class="col-12">
                                        <Container>
                                            <h2>Galería</h2>
                                            <Row>
                                                {imagenes.length === 0 ? (
                                                    <div mt-5 style={{ textAlign: 'center' }}>
                                                        <h1 className="mt-4" style={{ fontSize: '3rem', fontWeight: 'bold', color: '#555' }}>No hay fotos</h1>
                                                    </div>
                                                ) : (
                                                    imagenes.slice(0, 6).map((imagen, index) => (
                                                        <Col md={6} key={index}>
                                                            <img src={imagen} alt={`Imagen ${index}`} className="img-fluid" />
                                                        </Col>
                                                    ))
                                                )}
                                            </Row>

                                        </Container>
                                        <Link to={`/galeria/${artista.id}`}><button className="btn btn-outline-dark rounded-pill w-100 mt-3" disabled={imagenes.length === 0}> {'Ver más'} </button> </Link>
                                    </div>
                                </div>
                            </div>



                            <div class="col-md-6 text-center">
                                <div className='eventos-container'>
                                    <h1 style={{ textAlign: "left" }}>Eventos</h1>

                                    <ul className="list-group">
        {eventos.map((evento, index) => {
          const { fecha, nombre, artistasInvitados, lugar, pais } = formatEvent(evento);
          return (

       
            <li key={index} className="list-group-item">
                <div className="row">
                    <div className="col-4">
                        <h3>{fecha}</h3>
                        <p>{nombre}</p>
                        
                    </div>

                    <div className="col-4">
                        <h3>{lugar}</h3>
                        <p>{pais}</p>
                    </div>

        </div>
            </li>
                    )
          }
        )}
        
      </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

<div className="row mt-5">
            <Footer />
        </div>
            </div>
        ));

}

export default VistaArtista;
