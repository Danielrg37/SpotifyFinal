import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import BarraBusqueda from './BarraBusquedaCancion';
import { InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BarraNav from './BarraNav';
import Footer from './Footer';
import Error404 from './Error404';
import Loader from './Loader';

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    backgroundColor: 'white',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'gray',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'gray',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1DB954',
    },
  },
  option: {
    backgroundColor: 'white',
    color: 'black',
  },
}));

function VistaAdminArtista() {

 

  const [searchResults, setSearchResults] = useState([]);
  const [token, setToken] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [artista, setArtista] = useState({});
  
  const [albums, setAlbums] = useState([]);
  const [canciones, setCanciones] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [descripcion, setDescripcion] = useState([]);
  const [textoCortado, setTextoCortado] = useState([]);
  const [eventos, setEventos] = useState([]);

 


  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setToken(token);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist&limit=10`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        const artists = data.artists.items;
        setSearchResults(artists.map((artist) => artist.name));

        setArtista(artists[0]);


      } catch (error) {
        console.log(error);
      }
    };

    if (searchInput !== "") {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchInput, token]);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);


  // Socorro

  

  var id = artista.id;




 
 console.log(id);
    

  
 if (!localStorage.getItem('nombreUsuario')) {
  return <Error404 />;
}

if (localStorage.getItem('nombreUsuario') != 'admin') {
  return <Error404 />;
}

if (usuarioTipo === "") {
  return <Loader />;
}


  

  useEffect(() => {
    if (token && id) {    
      fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/ADiscos/${id}`, {
        method: 'GET',
        headers: {
          'X-Access-Token': sessionStorage.getItem('token'),
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



  useEffect(() => {
    if (token && id) {
        fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/ACanciones/${id}`, {
            method: 'GET',
            headers: {
                'X-Access-Token': sessionStorage.getItem('token'),
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
    if (artista.name) {
      fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/eventos/${artista.name}`, {
        method: 'GET',
        headers: {
          'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
        }
      })
        .then(response => response.json())
        .then(data => {
          setEventos(data);
        }
        )
    }
  }, [artista.name]);


  
  useEffect(() => {
    async function fetchDescripcion() {
      if (artista && artista.name) {
        const url = `http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/descripcion/${encodeURIComponent(
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
        let unicodeReplacedText = textResponse.replace(/\\\\u([\d\w]{4})/gi, function (match, grp) {
          return String.fromCharCode(parseInt(grp, 16));
        });
        
        let replacedText = unicodeReplacedText.replace(/{"descripcion":"|"}/g, '').replace(/\\u0026quot;/g, '"').replace(/\\u0026#x27;/g, "'");
        setDescripcion(replacedText);
        
        

        // Update the state with the plain text response

      }
    }
  
    // Invoke async function to fetch the description
    fetchDescripcion();
  }, [artista.name]);


  useEffect(() => {
    if(artista.name){
        fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/galeria/${artista.name}`, {
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



  return (
    <div className="container">
     <BarraNav />

      <div className="containers_info">
        <div className="row">
        <h2 style={{textAlign: 'center'}}>Consultar artistas via API</h2>
          <Link to={`/adminMenu2`}> <button className="btn btn-outline-success rounded-pill w-100" style={{height: '40px'}}> {'Volver atrás'} </button> </Link>
          <InputGroup className="mb-3 mt-4" size="lg">
            <FormControl
              placeholder="Busca tu artista favorito"
              aria-label="Busca tu artista favorito"
              type="input"
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  console.log('Pressed Enter');
                }
              }}
              onChange={(event) => {
                setSearchInput(event.target.value);
              }}
            />
            <button className="color-verde" onClick={() => { }}>
              Buscar
            </button>
          </InputGroup>
        </div>
        {searchResults.length > 0 || searchInput !== "" (
          <div className="container">

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
                  <div class="col-md-12 text-center">
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



               
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <div className="eventos-container">

                  <h1>Eventos</h1>
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
        )}
      </div>
      <div className="row mt-5">
      <Footer style={{ marginTop: 'auto' }} />
        </div>
    </div>
  );
}

export default VistaAdminArtista;