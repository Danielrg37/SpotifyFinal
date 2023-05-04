import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import "./css/busqueda/busqueda.css";


function BarraBusquedaGlobal() {

  const [searchInput, setSearchInput] = useState('');
  const [token, setToken] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [cancion, setCancion] = useState({});


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
          setSuggestions(data.tracks);
          setCancion(data.tracks.items[0]);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [searchInput, token]);


  console.log(cancion);

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





  return (
    <div className='app'>
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
          <Button onClick={() => {}}>Buscar</Button>
        </InputGroup>
        </Container>
        </div>




  );
}

export default BarraBusquedaGlobal;
