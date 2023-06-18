import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import BarraBusqueda from './BarraBusquedaCancion';
import { InputGroup, FormControl, ProgressBar } from 'react-bootstrap';
import VistaArtista from './VistaArtista';
import CommentSection from './ComentariosCaja';
import Footer from './Footer';
import BarraNav from './BarraNav';
import Error404 from './Error404';
import Loader from './Loader';
import './css/cancion/vista_cancion.css';

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
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState([]);
  const [token, setToken] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [cancion, setCancion] = useState({});

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setToken(token);
  }, []);

  
 

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchInput)}&type=track&limit=10`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const temas = data.tracks.items.slice(0, 10);
        setSearchResults(temas.map((tema) => tema.name));
        setCancion(temas[0]);
      })
      .catch(error => {
        console.log(error);
      });
  }, [searchInput, token]);
  

  
  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);
  
  var id = cancion.id;

 
  const [albums, setAlbums] = useState([]);
  const [stats, setStats] = useState([]);
  const [letras, setLetras] = useState([]);
  const [artista, setArtista] = useState('');
 
 
  const embedUrl = `https://open.spotify.com/embed/track/${id}`;

  if (!localStorage.getItem('nombreUsuario')) {
    return <Error404 />;
  }
  
  if(localStorage.getItem('nombreUsuario') == 'admin'){
    return <Error404 />;
  }
  
 
  // Otro código...

  useEffect(() => {
    if (token && cancion.id) {
      const id = cancion.id; // Move the id retrieval here
      fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/Cancion/${id}`, {
      method: "GET",
      headers: {
        'X-Access-Token': sessionStorage.getItem('token'),
        'Origin': 'http://localhost:5173'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCancion(data);
        setArtista(data.artists[0].name);
        return fetch(data.album.href, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.album_type === "album" || (data.album_type === "single" && data.tracks.total > 1)) {
          setAlbums([data]);
        }

        if(data.album_type === "single" && data.tracks.total === 1) {
          setAlbums([]);
        }
      })
      .catch(error => console.error(error));
  }
}, [token, cancion.id]);

useEffect(() => {
  // Realizar acciones adicionales después de que se haya actualizado completamente el estado de 'cancion'
  // Por ejemplo, imprimir el estado actualizado
  console.log(cancion);
}, [cancion]);

// Otro código...


  useEffect(() => {
    if (token) {
      fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/Features/${id}`, {
        method: "GET",
        headers: {
          'X-Access-Token': sessionStorage.getItem('token'),
          'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setStats([data]);
        })
        .catch(error => console.error(error));
    }
  }, [token, cancion.name]);

  console.log(stats);


 

  useEffect(() => {
    if (cancion.name && artista && searchInput) { 
      fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/letras/${artista}-${cancion.name}`, {
        method: 'GET',
        headers: {
          'Origin': 'http://localhost:5173'  // Reemplaza con la URL y el puerto de tu aplicación frontend
        }
      })
        .then(response => response.text()) // Convertir la respuesta a texto
        .then(data => {
          console.log(data);

          const lyrics = data.replace(/&quot;/g, '"').replace(/{"descripcion":"|"}/g, '').replace(/\\u0026quot;/g, '"'); // Replace HTML entity &quot; with "
          const decodedLyrics = decodeURIComponent(lyrics);



          // Split the lyrics into lines
          const lines = decodedLyrics.split('\n');

          // Render the lyrics with line breaks
          const lyricsMarkup = lines.map((line, index) => (
            <div key={index}>{line}<br /></div>
          ));



          // Set the lyrics in your state
          setLetras(lyricsMarkup);

        })
        .catch(error => {
          setError(true);
          console.error(error);
          if (error.response && error.response.status === 404) {
            setLetras('No hay letra disponible');
          }

        });
    }
  }, [cancion]);




  return (
    <div className="container">
      <BarraNav />

      <div className="containers_info">
        <div className="row">
          <h2 style={{textAlign: 'center'}}>Consultar canciones via API</h2>
          <Link to={`/adminMenu2`}> <button className="btn btn-outline-success rounded-pill w-100" style={{height: '40px'}}> {'Volver atrás'} </button> </Link>
          <InputGroup className="mb-3 mt-5" size="lg">
            <FormControl
              placeholder="Busca tu cancion favorita"
              aria-label="Busca tu cancion favorita"
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
        {searchResults.length > 0 && (
        <div className="container">
        <div className='cancion-container'>
          <div className="row">
            <div className="col-4">
              <img src={cancion.album?.images?.[1]?.url} alt="Artista 1" className="img-fluid" />
            </div>
            <div className="col-8">
              <h2>
                {cancion.artists && cancion.artists.length > 0 &&
                  <span>
                    {cancion.artists.map((artista) => (
                      <Link key={artista.id} className="custom-underline" to={`/artista/${artista.id}`}>
                        {artista.name}
                      </Link>
                    )).reduce((prev, curr) => [prev, ", ", curr])}
                  </span>
                }
              </h2>
              <h1>{cancion.name}</h1>
              <div className="row mt-5">
                <iframe
                  id="spotify-iframe"
                  src={embedUrl}
                  width="100%"
                  height="175"
                  frameBorder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className='disco-container'>
            <h1>Aparece en</h1>
            <div className="col-12" style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
              {albums.length === 0 ? (
                <div mt-5 style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#555' }}>No aparece en ningún álbum</p>
                </div>
              ) : (
                albums.map((album, index) => (
                  <div key={index} className="d-inline-block mx-2">
                    <Link to={`/disco/${album.id}`}>
                      <img src={album?.images?.[1]?.url} alt={`Canción ${index}`} className="img-fluid" width={250} height={250} />
                    </Link>
                    <p>{album.name}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>




        <div class="row mt-5">
  <div class="col-12 ml-2">
    <div class="info-container">
      <h2>Información</h2>
      <div class="row">
        <div class="col-12">
          <div class="estadisticas-container">
            {stats[0] && (
              <>
                <div className="stats-container mt-2">
                  <h5 className="text-wrap">Bailabilidad:</h5>
                  <ProgressBar now={stats[0].danceability * 100} label={`${(stats[0].danceability * 100).toFixed(0)}%`} />
                </div>

                <div className="stats-container mt-2">
                  <h5 className="text-wrap">Energia:</h5>
                  <ProgressBar now={stats[0].energy * 100} label={`${(stats[0].energy * 100).toFixed(0)}%`} />
                </div>

                <div className="stats-container mt-2">
                  <h5 className="text-wrap">Positividad:</h5>
                  <ProgressBar now={stats[0].speechiness * 100} label={`${(stats[0].speechiness * 100).toFixed(0)}%`} />
                </div>

                <div className="stats-container mt-2">
                  <h5 className="text-wrap">Acusticidad:</h5>
                  <ProgressBar now={stats[0].acousticness * 100} label={`${(stats[0].acousticness * 100).toFixed(0)}%`} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    
  
            </div>
           
          </div>

          <div class="col-12" >
            <div className='letra-container h-80'>
              <h2>Letra</h2>
              <div class="lyrics-container">
  <div class="lyrics-column">
    <h4>{letras}</h4>
  </div>


              </div>
            </div>
          </div>

        </div>

     

        <div className="row mt-5">
            <Footer />
        </div>
      </div>
        )}
      </div>
    </div>
  );
}

    


export default VistaAdminArtista;