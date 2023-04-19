
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/vista_artista.css';
import { useNavigate } from 'react-router-dom';

function VistaArtista() {

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

            <div className="row">
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
  getLabel: {
    padding: theme.spacing(1),
    backgroundColor: '#1DB954',
    color: 'white',
    fontWeight: 'bold',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
}));

export default function SearchBar() {
  const classes = useStyles();
  const [value, setValue] = useState(null);

  return (
    <div style={{ display: 'flex', maxWidth: 400 }}>
      <div className={classes.getLabel}>GET</div>
      <Autocomplete
        id="search-bar"
        options={[]}
        getOptionLabel={(option) => option}
        style={{ width: '100%' }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for an artist..."
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              classes: { root: classes.inputRoot },
            }}
          />
        )}
        classes={{ option: classes.option }}
      />
    </div>
  );
}

            </div>

            <div class="row mt-3">


            <div class="row mt-3">
                
            </div>

            <div className="row mt-3">
                
            </div>

            <div class="row mt-5">
                
            </div>

            <footer>
                <p class="float-end"><a href="#">Back to top</a></p>
                <p>Placeholder <a href="#">Placeholder</a> · <a href="#"></a></p>

            </footer>
        </div>
    );
}

export default VistaArtista;
