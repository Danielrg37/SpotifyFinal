import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { SearchBar } from './BarraBusqueda';

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

function VistaAdminCancion() {
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
    <div class="container">
      <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          Placeholder
        </a>
        <ul class="nav nav-pills">
          <Button className="green-color" onClick={() => navigate('/registro')}>
            Placeholder
          </Button>
        </ul>

      </header>

      <div className="containers_info">
        <div class="row">
          <h2>Consultar canciones via API</h2>
        
        </div>
      </div>
{/* 
      <div className="containers_info mt-4">
        <div class="row">
          <div class="col-8">
            <div class="row">
              <div class="col-2" style={{ backgroundColor: 'green', marginRight: '1rem' }}>
                <p>Placeholder</p>
              </div>
              <div class="col-2" style={{ backgroundColor: 'green', marginRight: '1rem' }}>
                <p>Placeholder</p>
              </div>
              <div class="col-2" style={{ backgroundColor: 'green', marginRight: '1rem' }}>
                <p>Placeholder</p>
              </div>
              <div class="col-2" style={{ backgroundColor: 'green', marginRight: '1rem' }}>
                <p>Placeholder</p>
              </div>
              <div class="col-2" style={{ backgroundColor: 'green', marginRight: '1rem' }}>
                <p>Placeholder</p>
              </div>
            </div>
            <div class="row mt-4">
            <div class="col-2" style={{ backgroundColor: 'green', marginRight: '1rem' }}>
                <p>Placeholder</p>
              </div>
              <div class="col-2" style={{ backgroundColor: 'green', marginRight: '1rem' }}>
                <p>Placeholder</p>
              </div>
              <div class="col-2" style={{ backgroundColor: 'green', marginRight: '1rem' }}>
                <p>Placeholder</p>
              </div>
              <div class="col-2" style={{ backgroundColor: 'green', marginRight: '1rem' }}>
                <p>Placeholder</p>
              </div>
              <div class="col-2" style={{ backgroundColor: 'green', marginRight: '1rem' }}>
                <p>Placeholder</p>
              </div>
              </div>
          </div>
          <div class="col-4">
            <img src="https://picsum.photos/1800/1800" class="img-fluid rounded-start" alt="..." />
          </div>
        </div>
      </div> */}


      <footer>
        <p class="float-end"><a href="#">Back to top</a></p>
        <p>Placeholder <a href="#">Placeholder</a> · <a href="#"></a></p>

      </footer>
    </div>
  );
}


export default VistaAdminCancion;
