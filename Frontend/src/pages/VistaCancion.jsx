import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/cancion/vista_cancion.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cheerio from 'cheerio';
import { Doughnut } from 'react-chartjs-2';
import { ProgressBar } from 'react-bootstrap';
import Loader from './Loader';
import CommentSection from './ComentariosCaja';




function VistaCancion() {


  const [cancion, setCancion] = useState({});
  const [albums, setAlbums] = useState([]);
  const [stats, setStats] = useState([]);
  const [letras, setLetras] = useState([]);


  const token = localStorage.getItem('token');
  const { id } = useParams();
  const embedUrl = `https://open.spotify.com/embed/track/${id}`;


  useEffect(() => {
    if (token) {
      fetch(`https://api.spotify.com/v1/tracks/${id}?si=c14fd7cce6ec4d59`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setCancion(data);
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
    if (token) {
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

  console.log(letras);



  function milisegundosAMinutosSegundos(milisegundos) {
    let minutos = Math.floor(milisegundos / 60000);
    let segundos = ((milisegundos % 60000) / 1000).toFixed(0);
    return minutos + ":" + (segundos < 10 ? '0' : '') + segundos;
  }

  console.log(cancion);





  return (
    !cancion && !cancion.album && !cancion.album.images ? (
      <Loader> </Loader>
    ) : (
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

     

        <footer>
          <p class="float-end"><a href="#">Back to top</a></p>
          <p>Placeholder <a href="#">Placeholder</a> · <a href="#"></a></p>

        </footer>
      </div>
    ));
}

export default VistaCancion;
