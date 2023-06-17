import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, FormControl, InputGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./css/busqueda/busqueda.css";
import BarraNav from './BarraNav';
import { Modal } from 'react-bootstrap';
import Footer from './Footer';
import Error404 from './Error404';
import Loader from './Loader';

function VistaCancionP() {
  const [searchInput, setSearchInput] = useState('');
  const [token, setToken] = useState('');
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [cancion, setCancion] = useState({});
 
  const [playlist_id, setPlaylist_id] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [playlistImage, setPlaylistImage] = useState(null);

  const [user_id, setUser_id] = useState('');

  const [creada, setCreada] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [embedUrl2, setEmbedUrl2] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setToken(token);
  }, []);

  if(!localStorage.getItem('nombreUsuario')){
    return <Error404 />;
  }

  useEffect(() => {
    if (token) {
      fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=track&limit=4`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setCancion(data.tracks.items[0]);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [searchInput, token]);

  useEffect(() => {
    if (token && cancion.id) {
      fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/recomendaciones/${cancion.id}`, {
        method: 'GET',
        headers: {
          'X-Access-Token': sessionStorage.getItem('token'),
          'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setRecomendaciones(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [token, cancion]);

  useEffect(() => {
    fetch('http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/usuarios/usuarios', {
      method: 'GET',
      headers: {
        Origin: 'http://localhost:5173',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const usuarioLogueado = data.find(usuario => usuario.nombreUsuario === localStorage.getItem('nombreUsuario'));
        setUser_id(usuarioLogueado.id);
      });
  }, []);

  useEffect(() => {
    if (playlist_id !== '') {
      setEmbedUrl2(`https://open.spotify.com/embed/playlist/${playlist_id}`);
    }
  }, [playlist_id]);

  const nuevaPlaylist = async () => {
    try {
      if (token) {
        const userResponse = await fetch('https://api.spotify.com/v1/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const userData = await userResponse.json();
        console.log(userData);
        const userId = userData.id;

        const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: playlistName,
            description: playlistDescription,
            public: true,
          }),
        });
        const playlistData = await playlistResponse.json();
        console.log(playlistData);
        setPlaylist_id(playlistData.id);

        const uris = recomendaciones.tracks.map(track => track.uri);

        const playlistTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uris: uris,
          }),
        });
        const playlistTracksData = await playlistTracksResponse.json();
        console.log(playlistTracksData);

        if (playlist_id !== '') {
          console.log(user_id);
          console.log(playlist_id);
          console.log(playlistName);
          console.log(new Date());

          const crearPlaylistResponse = await fetch('http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/playlist/crearPlaylist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Origin: 'http://localhost:5173',
            },
            body: JSON.stringify({
              idUsuario: user_id,
              idPlaylist: playlist_id,
              nombre: playlistName,
            }),
          });
          const crearPlaylistData = await crearPlaylistResponse.json();
        setEmbedUrl2(`https://open.spotify.com/embed/playlist/${playlist_id}`);        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(creada);

  const embedUrl = `https://open.spotify.com/embed/track/${cancion.id}`;

  return (
    <div className='container'>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body>
          <Modal.Header>
            <Modal.Title style={{ color: 'black' }}>Crear playlist</Modal.Title>
          </Modal.Header>
          <FormControl
            placeholder="Nombre de la playlist"
            aria-label="Nombre de la playlist"
            type="input"
            value={playlistName}
            onChange={event => setPlaylistName(event.target.value)}
          />
          <FormControl
            placeholder="Descripción de la playlist"
            aria-label="Descripción de la playlist"
            type="input"
            className='mt-3'
            value={playlistDescription}
            onChange={event => setPlaylistDescription(event.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className='color-verde' onClick={nuevaPlaylist}>
            Crear
          </Button>
          <Button className='color-verde' onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <BarraNav />
      <div className='row mt-4'>
        <Container className="mt-5">
          <InputGroup className="mb-3 mt-5" size="lg">
            <FormControl
              placeholder="Busca tu canción favorita"
              aria-label="Busca tu canción favorita"
              type="input"
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  console.log('Pressed Enter');
                }
              }}
              onChange={event => {
                setSearchInput(event.target.value);
              }}
            />
            <Button className="color-verde" onClick={() => handleShowModal()}>
              Crear playlist
            </Button>
          </InputGroup>
          {searchInput != null && (
            <div className="row mt-3">
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
                        title="spotify-iframe" // Use 'title' instead of 'id'
                        src={embedUrl}
                        width="100%"
                        height="175"
                        frameBorder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="row mt-5">
            {creada && embedUrl2 && (
              <iframe
                title="spotify-iframe2"
                src={embedUrl2}
                width="100%"
                height="175"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
              ></iframe>
            )}
          </div>
        </Container>
        <div className="row mt-5">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default VistaCancionP;
