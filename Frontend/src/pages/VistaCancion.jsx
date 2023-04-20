import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/vista_cancion.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function VistaCancion() {


  const [cancion, setCancion] = useState({});
  const [albums, setAlbums] = useState([]);

  const ID_GENIUS = "-ImT2ynhgjGOA_ktoe31opdJw0huxaFal8txUqK5Vjui_hgwES2ceLIlFDSNdAGP";


  const artistName = 'Queen';
  const songTitle = 'Bohemian Rhapsody';



  // Primero, busca la canción por el nombre del artista y título de la canción
  fetch(`https://api.genius.com/search?q=${artistName}%20${songTitle}`, {
    headers: {
      Authorization: `Bearer ${ID_GENIUS}`
    }
  })
    .then(response => response.json())
    .then(data => {
      const songId = data.response.hits[0].result.id; // Obtiene el ID de la canción desde los resultados de búsqueda



      // Luego, obtén la letra de la canción por ID
      return fetch(`https://api.genius.com/songs/${songId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    })
    .then(response => response.json())
    .then(data => {
      const songLyrics = data.response.song.media[0].body; // Obtiene la letra de la canción



      console.log(songLyrics); // Imprime la letra de la canción en la consola
    })
    .catch(error => console.error(error)); // Manejo de errores

  const token = localStorage.getItem('token');
  const { id } = useParams();


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
        .then(data => setAlbums([data]))
        .catch(error => console.error(error));
    }
  }, [token]);

 

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

      <div className="row">
        <div className="col-4">
          <img src={cancion.album?.images?.[1]?.url} alt="Artista 1" className="img-fluid" />
        </div>
        <div className="col-8">
          <h2>
            {cancion.artists && cancion.artists.length > 0 &&
              <span>
                {cancion.artists.map((artista) => (
                  <span key={artista.id}>{artista.name}</span>
                )).reduce((prev, curr) => [prev, ", ", curr])}
              </span>
            }

          </h2>
          <h1>{cancion.name}</h1>

          <div className="row mt-5">
            <iframe
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
      <div class="row mt-3">
        <div class="col-md-4 text-center">
          <h4>Veces reproducida</h4>
          <p>Placeholder</p>
        </div>
        <div class="col-md-4 text-center">
          <h4>Duración</h4>
          <p>Duración: {milisegundosAMinutosSegundos(cancion.duration_ms)}</p>
        </div>
        <div class="col-md-4 text-center">
          <h4>Tiempo total de reproducción</h4>
          <p>Placeholder horas</p>
        </div>
      </div>
      <div className="row mt-3">
        <h1>Aparece en</h1>
        <div className="col-12" style={{ overflowX: 'hidden', overflowY: 'hidden', whiteSpace: 'nowrap' }}>
          {albums.map((album, index) => (
            <div key={index} className="d-inline-block mx-2">
              <Link to={`/disco/${album.id}`}>
                <img src={album?.images?.[1]?.url} alt={`Canción ${index}`} className="img-fluid" width={250} height={250} />
              </Link>
              <p>{album.name}</p>
            </div>
          ))}
        </div>
      </div>




      <div class="row mt-5">
        <div class="col-6 ml-2">
          <h2>Mi historial de reproducciones</h2>
          <table class="table table-responsive">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Canción</th>
                <th>Hora</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, i) => (
                <tr key={i}>
                  <td><img src={albums[0]?.images[2]?.url} alt={`Canción ${i}`} className="img-fluid" /></td>
                  <td>{cancion.name}</td>
                  <td>{milisegundosAMinutosSegundos(cancion.duration_ms)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div class="col-4">
          <h2>Letra</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nihil molestias qui ducimus laboriosam? Sit eaque consequuntur eveniet, unde quia at, tempora voluptatem, delectus maiores asperiores dignissimos in odio magnam!</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum, ratione odit. Iste ad nihil eligendi molestiae assumenda delectus magnam minima odio culpa repudiandae omnis officia exercitationem, vel rem veniam ratione!</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem doloremque veniam sint ipsum alias, quibusdam quod porro accusamus enim quasi inventore aliquid et dolor repellat dicta voluptate dolorem nulla quo?</p>
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
