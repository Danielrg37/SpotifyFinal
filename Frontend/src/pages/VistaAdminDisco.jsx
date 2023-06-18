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
import { useNavigate, useParams } from 'react-router-dom';
import BarraNav from './BarraNav';
import Footer from './Footer';
import CommentSection from './ComentariosCaja';
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

function VistaAdminDisco() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]);
  const [token, setToken] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [artista, setArtista] = useState({});

  const [disco, setDisco] = useState({});
  const [cancionesDisco, setCancionesDisco] = useState([]);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setToken(token);

  }, []);

  const id = disco.id;

  const [loading, setLoading] = useState(true);

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
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=album&limit=10`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const discos = data.albums.items;
        setSearchResults(discos);
        setDisco(discos[0]);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchInput !== '') {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchInput, token]);

  useEffect(() => {
    if (token && id !== undefined) {
      fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/Disco/${id}`, {
        method: 'GET',
        headers: {
          'X-Access-Token': sessionStorage.getItem('token'),
          Origin: 'http://localhost:5173', // Replace with your front-end application's URL and port
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const album = JSON.parse(data.album); // Parse the album JSON string into an object
          const tracks = JSON.parse(data.tracks); // Parse the tracks JSON string into an object
          setDisco(album);
          setCancionesDisco(tracks.items);
          const baseUrl = 'https://www.amazon.es/s?k=';
          const searchQuery = `${album.artists[0].name}+${album.name}`;
          const url = baseUrl + searchQuery;
          setUrl(url);
        })
        .catch((error) => console.error(error));
    }
  }, [token, id]);

  const embedUrl = `https://open.spotify.com/embed/album/${id}`;

  return (
    <div className="container">
      <BarraNav />

      <div className="containers_info">
        <div className="row">

        <h2 style={{textAlign: 'center'}}>Consultar discos via API</h2>
        <Link to={`/adminMenu2`}> <button className="btn btn-outline-success rounded-pill w-100" style={{height: '40px'}}> {'Volver atrás'} </button> </Link>
          <InputGroup className="mb-3 mt-5" size="lg">
            <FormControl
              placeholder="Busca tu disco favorito"
              aria-label="Busca tu disco favorito"
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
                        )).reduce((prev, curr) => [prev, ', ', curr])}
                      </span>
                    }
                  </h2>
                  <h1>{disco.name}</h1>
                  {url !== '' && <button href={url} className="green-color mt-2">Compra en Amazon</button>}
                </div>
              </div>
            </div>
            <div className='disco-container mt-3'>
              <div className="row mt-3">
                <h1>Canciones que pertenecen al disco</h1>
                <div className="col-12" style={{ overflowX: 'scroll', whiteSpace: 'nowrap', height: '300px' }}>
                  {cancionesDisco.map((cancion, index) => (
                    <div key={index} className="d-inline-block mx-2">
                      <Link to={`/cancion/${cancion.id}`} className="custom-underline">
                        <img src={disco?.images?.[1]?.url} alt={`Canción ${index}`} className="img-fluid" width="250" height="250" />
                        <p>{cancion.name}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="row mt-5 mb-3">
             
              <div className="col-12 cancion-container">
                <h1 style={{ textAlign: 'center' }}>Vista del disco</h1>
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
           
          </div>
        )}
      </div>
      <div className="row mt-5">
              <Footer />
            </div>
    </div>
  );
}

export default VistaAdminDisco;
