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
