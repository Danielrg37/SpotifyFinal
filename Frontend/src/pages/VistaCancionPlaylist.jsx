import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import "./css/busqueda/busqueda.css";
import BarraNav from './BarraNav';


function VistaCancionC() {

    const [searchInput, setSearchInput] = useState('');
    const [token, setToken] = useState('');
    const [recomendaciones, setRecomendaciones] = useState([]);
    const [cancion, setCancion] = useState({});
    const [user_id, setUser_id] = useState('');
    const [playlist_id, setPlaylist_id] = useState('');



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

    return (
        <div className='container'>
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
                    <Button className="color-verde" onClick={() => nuevaPlaylist()}>Buscar</Button>
                </InputGroup>
                <div className="row mt-3">
                    <div className='disco-container'>
                        <h1 style={{textAlign: 'center'}}>Playlist generada</h1>
                        <div className="col-12" style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
                            <div className="row">
                                <div className="row artist-container">
                                    <div className="col-5 bg-dark artist-image">
                                        {Object.keys(cancion).length > 0 &&
                                            <img src={cancion.album.images[0].url} alt="Imagen del cancion" />
                                        }
                                    </div>

                                    <div className="col-7 bg-dark artist-details">
                                        {Object.keys(cancion).length > 0 && playlist_id &&


<iframe src={`https://open.spotify.com/embed/playlist/${playlist_id}?show-tracklist=true`} width="100%" height="400" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

                                        }

                                    </div>
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
