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

  const [usuarioTipo, setUsuarioTipo] = useState("");

  useEffect(() => {
      if (localStorage.getItem('nombreUsuario')) {
        fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/usuarios/usuarios`, {
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
            setUsuarioTipo(usuario.tipo);
            console.log(usuarioTipo);
          }
        })
        .catch(error => console.error(error));
      }
    }, []);

    if (usuarioTipo === "user") {
      return <Error404 />;
    } else if (usuarioTipo === "") {
      return <Loader />;
    }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchInput)}&type=track&limit=10`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        const temas = data.tracks.items;
        setSearchResults(temas.map((tema) => tema.name));
       
        setCancion(temas[0]);
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
  

  var id = cancion.id;

 
  const [albums, setAlbums] = useState([]);
  const [stats, setStats] = useState([]);
  const [letras, setLetras] = useState([]);
 
 
  const embedUrl = `https://open.spotify.com/embed/track/${id}`;


  useEffect(() => {
    if (token && id !== undefined) {  
      fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/Cancion/${id}`, {
        method: "GET",
        headers: {
          'X-Access-Token': sessionStorage.getItem('token'),
          'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
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
        })
        .catch(error => console.error(error));
    }
  }, [token]);


  useEffect(() => {
    if (token && id !== undefined) {  
      fetch(`https://api.spotify.com/v1/audio-features/${id}?si=c14fd7cce6ec4d59`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setStats([data]);
        })
        .catch(error => console.error(error));
    }
  }, [token]);

  console.log(stats);

  useEffect(() => {
    if (cancion.name) {
      fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/letras/${encodeURIComponent(cancion.name)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setLetras(data);
        })
        .catch(error => console.error(error));
    }
  }, [token, cancion.name]);
 

/* 
  const songTitle = cancion.name;
  const GENIUS_KEY = '-ImT2ynhgjGOA_ktoe31opdJw0huxaFal8txUqK5Vjui_hgwES2ceLIlFDSNdAGP';

  useEffect(() => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.genius.com/search?q=${songTitle}`, {
      headers: {
        Authorization: `Bearer ${GENIUS_KEY}`
      }
    })
      .then(response => {
        const song = response.data.response.hits[0].result;
        console.log(song);
        axios.get(song.url)
          .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const lyrics = $('.lyrics').text().trim();
            setLetras(lyrics);
          })
      })
  }, [songTitle]);

  console.log(letras); */



  function milisegundosAMinutosSegundos(milisegundos) {
    let minutos = Math.floor(milisegundos / 60000);
    let segundos = ((milisegundos % 60000) / 1000).toFixed(0);
    return minutos + ":" + (segundos < 10 ? '0' : '') + segundos;
  }

  console.log(cancion);



  console.log(letras);





 



  return (
    <div className="container">
      <BarraNav />

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
          <div class="col-8 ml-2">
            <div class="info-container">
              <h2>Información</h2>
              <div class="estadisticas-container">
                <div class="row">
                  <div class="col-6">
                    {stats[0] &&
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
                    }

                  </div>

                  <div class="col-6">

                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 mt-4">
                  <CommentSection></CommentSection>
                  </div>
          </div>

          <div class="col-4">
            <div className='letra-container h-80'>
              <h2>Letra</h2>
              <div class="lyrics-container">
  <div class="lyrics-column">
    <p>[Intro: María Escarmiento]<br></br>
    Ah-ah-ah-ah, ah-ah-ah-ah-ah<br></br>
    Ah, ah, ah-ah<br></br>
    Ah, ah-ah-ah</p>

    <p>[Estribillo: María Escarmiento]<br></br>
    Ni yo misma sabía cómo lloraba tanto<br></br>
    Ese día que te llamé (Eah)<br></br>
    Llevaba ya horas sentada en un banco<br></br>
    Sola, sin poderme mover (Ahj-ah)<br></br>
    Te la suda todo, y esto va para largo<br></br>
    Esta vez no voy a poder (Poder)<br></br>
    Me ganaste y salté (Uh, uh, uh, uh, uh)</p>

 

    <p>[Estribillo: María Escarmiento]<br></br>
    Ni yo misma sé cómo lloraba tanto<br></br>
    Ese día que te llamé (Ah-ah)<br></br>
    Llevaba ya horas sentada en un banco (Oh)<br></br>
    Sola, sin poderme mover<br></br>
    Te la suda todo, y esto va para largo<br></br>
  Esta vez no voy a poder (Poder)<br></br>
    Me ganaste y salté (Salté)</p>

  

    <p>[Estribillo: María Escarmiento]<br></br>
    Ni yo misma sé cómo lloraba tanto<br></br>
    Ese día que te llamé<br></br>
    Llevaba ya horas sentada en un banco<br></br>
  Sola, sin poderme mover<br></br>
    Ya yo misma sé cómo lloraba tanto<br></br>
    Ese día que te llamé<br></br>
    Ni yo misma sé cómo lloraba tanto<br></br>
    Tanto, tan-tan-tan-tan-tanto</p>
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
