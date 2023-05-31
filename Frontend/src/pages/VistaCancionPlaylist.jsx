import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, FormControl, InputGroup, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./css/busqueda/busqueda.css";
import BarraNav from './BarraNav';
import { Modal } from 'react-bootstrap';



function VistaCancionC() {

    const [searchInput, setSearchInput] = useState('');
    const [token, setToken] = useState('');
    const [recomendaciones, setRecomendaciones] = useState([]);
    const [cancion, setCancion] = useState({});
    const [user_id, setUser_id] = useState('');
    const [playlist_id, setPlaylist_id] = useState('');

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        console.log(file);
        
    }

    




    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    }, []);

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
        if (token) {
            fetch(`https://localhost:5120/Perfil`, {
                method: 'GET',
                headers: {
                    'X-Access-Token': localStorage.getItem('token'),
                    'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
                }
            })
                .then(response => response.json())  
                .then(data => {
                        console.log(data);
                            setUser_id(data.id);
                });
        }
    }, [token]); 

    useEffect(() => {
        if (token) {
            fetch(`https://localhost:5120/recomendaciones/${cancion.id}`, {
                method: 'GET',
                headers: {
                    'X-Access-Token': localStorage.getItem('token'),
                    'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setRecomendaciones(data);
                }
                );
        }
    }, [token, cancion]);
    


    const nuevaPlaylist = () => {
        if (token) {
            fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'Recomendaciones de ' + cancion.name,
                    description: 'Recomendaciones de ' + cancion.name,
                    public: true,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setPlaylist_id(data.id);
                    const uris = recomendaciones.tracks.map(track => track.uri);

                    fetch(`https://api.spotify.com/v1/playlists/${data.id}/tracks`, {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            uris: uris,
                        }),
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                        })

                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const embedUrl = `https://open.spotify.com/embed/track/${cancion.id}`;


    return (
        <div className='container'>
  <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Body>
        <Modal.Header>
            <Modal.Title>Crear playlist</Modal.Title>
        </Modal.Header>
        <FormControl
          placeholder="Nombre de la playlist"
          aria-label="Nombre de la playlist"
          type="input"
        />
        <FormControl
          placeholder="Descripción de la playlist"
          aria-label="Descripción de la playlist"
          type="input"
          className='mt-3'
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className='mt-3'

        />
      </Modal.Body>
        <Modal.Footer>
          <Button className='color-verde' onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>


            <BarraNav />
            <Container>

                <InputGroup className="mb-3" size="lg">
                    <FormControl
                        placeholder="Busca tu cancion favorito"
                        aria-label="Busca tu cancion favorito"
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
                    <Button className="color-verde" onClick={() => handleShowModal()}>Crear playlist</Button>
                </InputGroup>
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
                </div>
            </Container>
        </div>

        
    );
}

export default VistaCancionC;