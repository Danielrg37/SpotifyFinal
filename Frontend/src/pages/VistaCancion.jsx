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



  function milisegundosAMinutosSegundos(milisegundos) {
    let minutos = Math.floor(milisegundos / 60000);
    let segundos = ((milisegundos % 60000) / 1000).toFixed(0);
    return minutos + ":" + (segundos < 10 ? '0' : '') + segundos;
  }

  console.log(cancion);





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
                  <p>Acústica: {stats[0]?.acousticness}</p>
                  <p>Danceability: {stats[0]?.danceability}</p>
                  <p>Energy: {stats[0]?.energy}</p>
                  <p>Instrumentalness: {stats[0]?.instrumentalness}</p>
                  <p>Liveness: {stats[0]?.liveness}</p>
                  <p>Loudness: {stats[0]?.loudness}</p>
                  <p>Speechiness: {stats[0]?.speechiness}</p>
                  <p>Tempo: {stats[0]?.tempo}</p>
                  <p>Valence: {stats[0]?.valence}</p>
                </div>

                <div class="col-6">
                  <p>Key: {stats[0]?.key}</p>
                  <p>Mode: {stats[0]?.mode}</p>
                  <p>Time Signature: {stats[0]?.time_signature}</p>
                  <p>Duration: {stats[0]?.duration_ms}</p>

                  <p>Popularity: {stats[0]?.popularity}</p>
                  <p>Explicit: {stats[0]?.explicit}</p>
                  <p>Disc Number: {stats[0]?.disc_number}</p>
                  <p>Track Number: {stats[0]?.track_number}</p>

                </div>
              </div>



            </div>
          </div>
        </div>



        <div class="col-4">
          <div className='letra-container'>
            <h2>Letra</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nihil molestias qui ducimus laboriosam? Sit eaque consequuntur eveniet, unde quia at, tempora voluptatem, delectus maiores asperiores dignissimos in odio magnam!</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum, ratione odit. Iste ad nihil eligendi molestiae assumenda delectus magnam minima odio culpa repudiandae omnis officia exercitationem, vel rem veniam ratione!</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem doloremque veniam sint ipsum alias, quibusdam quod porro accusamus enim quasi inventore aliquid et dolor repellat dicta voluptate dolorem nulla quo?</p>
          </div>
        </div>
      </div>








      <footer>
        <p class="float-end"><a href="#">Back to top</a></p>
        <p>Placeholder <a href="#">Placeholder</a> · <a href="#"></a></p>

      </footer>
    </div>
  );
}

export default VistaCancion;
