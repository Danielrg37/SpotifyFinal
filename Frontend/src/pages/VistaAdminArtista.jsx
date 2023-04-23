import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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
      renderOption={(option) => (
        <React.Fragment>
          {option}
        </React.Fragment>
      )}
      classes={{ option: classes.option }}
      noOptionsText="No hay resultados"
    />
  );
}

export default VistaAdminArtista;
