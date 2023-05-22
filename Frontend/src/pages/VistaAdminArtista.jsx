import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import BarraBusqueda from './BarraBusquedaArtista';
import VistaArtista from './VistaArtista';

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    backgroundColor: 'white',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'gray',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'gray',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1DB954',
    },
  },
  option: {
    backgroundColor: 'white',
    color: 'black',
  },
}));

function VistaAdminArtista() {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${searchValue}&type=artist&limit=10`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        const artists = data.artists.items;
        setSearchResults(artists.map((artist) => artist.name));
      } catch (error) {
        console.log(error);
      }
    };

    if (searchValue !== "") {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchValue, token]);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

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

      <div className="containers_info">
        <div className="row">
          <h2>Consultar artistas vía API</h2>
          <BarraBusqueda></BarraBusqueda>
          {searchValue !== "" && <VistaArtista id={searchValue}></VistaArtista>}
        </div>
      </div>

      <footer>
        <p className="float-end"><a href="#">Back to top</a></p>
        <p>Placeholder <a href="#">Placeholder</a> · <a href="#"></a></p>
      </footer>
    </div>
  );
}

export default VistaAdminArtista;
