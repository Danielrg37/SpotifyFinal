import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import "./css/busqueda/busqueda.css";


function BarraBusqueda() {

  const [searchInput, setSearchInput] = useState('');
  const [token, setToken] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [artista, setArtista] = useState({});


  useEffect(() => {
    const token = localStorage.getItem('token');
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
          setSuggestions(data.artists.items);
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
            placeholder="Busca tu artista favorito"
            aria-label="Busca tu artista favorito"
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
          <Button onClick={() => { }}>Buscar</Button>
        </InputGroup>
        <div className="row mt-3">
          <div className='disco-container'>
            <h1>Información del artista</h1>
            <div className="col-12" style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
              <div className="row">
              <div className="row artist-container">
  <div className="col-5 bg-dark artist-image">
    {artista.images && artista.images.length > 0 &&
      <img src={artista.images[0].url} alt="Imagen del artista" />
    }
  </div>
  <div className="col-7 bg-dark artist-details">
    {artista.images && artista.images.length > 0 &&
      <>
        <div className="artist-name">
          <h2>{artista.name}</h2>
        </div>
        
        <ul>
         <div className='artist-name'>
          {artista.followers.total}
          </div>

          <li><strong>Followers:</strong> {artista.followers.total}</li>
          <li><strong>Popularity:</strong> {artista.popularity}</li>
          <li><strong>Type:</strong> {artista.type}</li>
          <li><strong>Spotify URI:</strong> {artista.uri}</li>
          <li><strong>External URL:</strong> <a href={artista.external_urls.spotify}>{artista.external_urls.spotify}</a></li>
          <li><strong>ID:</strong> {artista.id}</li>
        </ul>
      </>
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

export default BarraBusqueda;
