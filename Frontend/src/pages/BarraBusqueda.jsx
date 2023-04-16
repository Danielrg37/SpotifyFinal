import React, { useState } from 'react';
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

const options = ['Opción 1', 'Opción 2', 'Opción 3'];

export default function SearchBar() {
  const classes = useStyles();
  const [value, setValue] = useState(null);

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
