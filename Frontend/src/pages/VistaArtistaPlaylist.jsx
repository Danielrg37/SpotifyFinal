import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, FormControl, InputGroup, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/busqueda/busqueda.css';
import { useNavigate } from 'react-router-dom';
import BarraNav from './BarraNav';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './css/artista/vista_artista.css';
import Error404 from './Error404';
import Loader from './Loader';

function VistaArtistaP() {
  const [searchInput, setSearchInput] = useState('');
  const [token, setToken] = useState('');
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [artista, setArtista] = useState({});

  const [playlist_id, setPlaylist_id] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [embedUrl2, setEmbedUrl2] = useState('');

  const [user_id, setUser_id] = useState('');

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  if (usuarioTipo === "user") {
    return <Error404 />;
  } else if (usuarioTipo === "") {
    return <Loader />;
  }


  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist&limit=4`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setArtista(data.artists.items[0]);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [searchInput, token]);

  useEffect(() => {
    if (token && artista.id) {
      fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/recomendacionesArtista/${artista.id}`, {
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
  }, [token, artista]);

  console.log(recomendaciones);
  console.log(user_id);

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

  return (
    <div className='container'>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black' }}>Crear playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        <div className="row mt-3">
          <div className='artista-container'>
            <div className="row">
              <div className="col-4">
                <img src={artista?.images?.[1]?.url} alt="Artista 1" className="img-fluid rounded-circle" style={{ width: '250px', height: '250px' }} />
              </div>
              <div className="col-8">
                <h1>{artista.name}</h1>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className="row mt-5">
        <Footer />
      </div>
    </div>
  );
}

export default VistaArtistaP;
