import React, { useState, useEffect, useRef} from 'react';
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
import Chart from 'chart.js/auto';
import Footer from './Footer';
import BarraNav from './BarraNav';  









function VistaCancion() {


  const [cancion, setCancion] = useState({});
  const [albums, setAlbums] = useState([]);
  const [stats, setStats] = useState([]);
  const [letras, setLetras] = useState([]);
  const [artista, setArtista] = useState([]);


  const token = localStorage.getItem('token');
  const { id } = useParams();
  const embedUrl = `https://open.spotify.com/embed/track/${id}`;

 
  useEffect(() => {
    if (token) {  
      fetch(`http://localhost:5120/Cancion/${id}`, {
        method: "GET",
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
          'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
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
        })
        .catch(error => console.error(error));
    }
  }, [token]);

useEffect(() => {
    if (token) {
      fetch(`http://localhost:5120/Features/${id}`, {
        method: "GET",
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
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
  }, [token]);

  console.log(stats);



 
 useEffect(() => {
  if (cancion.name) {
    fetch(`http://localhost:5120/letras/${artista}-${cancion.name}`, {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:5173'  // Reemplaza con la URL y el puerto de tu aplicación frontend
      }
    })
      .then(response => response.text()) // Read the response as text, not JSON
      .then(data => {
        const lyrics = data.replace(/&quot;/g, '"'); // Replace HTML entity &quot; with "
        const decodedLyrics = decodeURIComponent(lyrics);

        // Split the lyrics into lines
        const lines = decodedLyrics.split('\n');

        // Render the lyrics with line breaks
        const lyricsMarkup = lines.map((line, index) => (
          <div key={index}>{line}<br/></div>
        ));

        // Set the lyrics in your state
        setLetras(lyricsMarkup);
      })
      .catch(error => console.error(error));
  }
}, [cancion.name]);

  
  
  
console.log(`http://localhost:5120/letras/${artista}-${cancion.name}`);

  useEffect(() => {
    const data = [
      { label: 'Bailabilidad', value: stats.danceability },
      { label: 'Energía', value: stats.energy },
      { label: 'Positividad', value: stats.valence },
      { label: 'Acusticidad', value: stats.acousticness }
    ];
  
    const ctx = document.getElementById('grafico').getContext('2d');
    let chartInstancia = null;
  
    if (ctx) {
      if (chartInstancia) {
        chartInstancia.destroy(); // Destruir gráfico existente
      }
  
      chartInstancia = new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: data.map((row) => row.label),
          datasets: [
            {
              data: data.map((row) => row.value),
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0'
              ]
            }
          ]
        }
      });
    }
  
    return () => {
      if (chartInstancia) {
        chartInstancia.destroy(); // Destruir gráfico al desmontar el componente
      }
    };
  }, [stats]);
  
  
  
  
 

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

  console.log(letras);

  return (
    !cancion && !cancion.album && !cancion.album.images ? (
      <Loader> </Loader>
    ) : (
      <div className="container">
        <BarraNav />

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
          <h4 style={{textAlign: 'center'}}>Duración: {milisegundosAMinutosSegundos(stats[0]?.duration_ms)}</h4>
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
                  <canvas id="grafico" width="400" height="400"></canvas>

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
  <p>{letras}</p>
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

export default VistaCancion;
