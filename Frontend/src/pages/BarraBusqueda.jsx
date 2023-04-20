import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    backgroundColor: 'white', // Cambiar el color de fondo a blanco
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
    backgroundColor: 'white', // Cambiar el color de fondo de las opciones a negro
    color: 'black', // Cambiar el color del texto a blanco
  },
}));

export function SearchBar() {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${searchValue}&type=track&limit=10`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Reemplazar "accessToken" con tu token de acceso a la API de Spotify
          },
        });
        const data = await response.json();
        const tracks = data.tracks.items;
        setSearchResults(tracks.map((track) => track.name));
      } catch (error) {
        console.log(error);
      }
    };

    if (searchValue !== "") {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchValue]);
  

  return (
    <Autocomplete
      id="search-bar"
      options={searchResults}
      getOptionLabel={(option) => option}
      style={{ width: '100%', maxWidth: 400 }}
      value={searchValue}
      onChange={(event, newValue) => {
        setSearchValue(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            classes: { root: classes.inputRoot },
          }}
        />
      )}
      classes={{ option: classes.option }} // Agregar la clase "option" a las opciones
    />
  );
}