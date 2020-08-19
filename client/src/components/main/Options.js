import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SelectValute from '../graf/SelectValute';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Options() {
  const rows = useSelector(state => state.data.valute);
  const [rub, setRub] = useState(0);
  const [val, setVal] = useState(0);
  const {index} = useSelector(state => state.graf);
  const classes = useStyles();
  
  function change(rev, e = rub) {
    const {nominal, value} = rows[index];
    if(rev === 'rub' && e !== ''){
      setVal(((e * nominal) /  value).toFixed(2))
    } else if(rev === 'val'){
      setRub(((e / nominal) * value).toFixed(2))
    } 
  }
  
  const handleChangeRub = (e) => {
    setRub(e.target.value);
    change('rub', e.target.value);
  }
  
  const handleChangeVal = (e) => {
    setVal(e.target.value);
    change('val', e.target.value);
  }

  useEffect(() => {
    change('rub')
  },[index])

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="baseline"
    >
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          label="Сумма в рублях"
          id="outlined-size-normal"
          variant="outlined"
          value={rub}
          onChange={handleChangeRub}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
        <SelectValute/>
        <TextField
          label="Сумма в валюте"
          id="outlined-size-normal"
          variant="outlined"
          value={val}
          onChange={handleChangeVal}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
      </form>
    </Grid>
  )
}

export default Options;
