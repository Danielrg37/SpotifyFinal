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



  useEffect(() => {
    const token = localStorage.getItem('token');
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
  const [albums, setAlbums] = useState([]);
  const [canciones, setCanciones] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [descripcion, setDescripcion] = useState([]);
  const [textoCortado, setTextoCortado] = useState([]);
  const [eventos, setEventos] = useState([]);

  console.log(artista);
  var id = artista.id;
  console.log(id);

  useEffect(() => {
    if (token && id !== undefined) {

      fetch(`http://localhost:5120/Artistadiscos/${id}`, {
        method: 'GET',
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
          'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
        }
      })
        .then(response => response.json())
        .then(data => {
          setAlbums(data.items);
        });

    }
  }, [token]);



  useEffect(() => {
    if (token && id !== undefined) {
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
    if (token && id !== undefined) {

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

  /*   useEffect(() => {
      async function fetchImages() {
          if (artista && artista.name) {
              const url = `https://www.last.fm/music/${encodeURIComponent(
                  artista.name
              )}/+images?${new Date().getTime()}`;
              console.log(url);
  
              //send HTTP request using fetch
              const response = await fetch(url, {
                  headers: {
                      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                      'Accept-Language': 'en-US,en;q=0.9',
                  }
              });
  
              //parse HTML response using Cheerio
              const html = await response.text();
              const $ = cheerio.load(html);
  
              //get all image URLs and add them to an array
              const images = [];
              $('.image-list-item img').each((i, element) => {
                  const imageUrl = $(element).attr('src');
  
                  images.push(imageUrl.replace('avatar170s', 'avatar1920s')); // actualizar la url de la imagen
              });
  
              //set state with array of image URLs
              setImagenes(images);
          }
      }
  
      //invoke async function to fetch images
      fetchImages();
  }, [artista.name]);
  */


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
        }
        )
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





  //Ending 



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

      <div className="containers_info">
        <div className="row">
          <h2>Consultar artistas via API</h2>
          <InputGroup className="mb-3" size="lg">
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
            <Button className="color-verde" onClick={() => { }}>
              Buscar
            </Button>
          </InputGroup>
        </div>
        {searchResults.length > 0 && (
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
                    <div className='noticias-container'>
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
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <div className="eventos-container">

                  <h1>Eventos</h1>


                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VistaAdminArtista;
