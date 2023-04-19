import React, { useState } from 'react';
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

export default function SearchBar() {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);

    fetch(`https://api.spotify.com/v1/search?type=artist&q=${event.target.value}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const results = data.artists.items.map((artist) => artist.name);
        setOptions(results);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Autocomplete
      id="search-bar"
      options={options}
      getOptionLabel={(option) => option}
      style={{ width: '100%', maxWidth: 400 }}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      onInputChange={handleChange}
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
      classes={{ option: classes.option }} 
    />
  );
}
