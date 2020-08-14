import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
  const [rub, setRub] = useState();
  const [val, setVal] = useState();
  const [valuteIndex, setValuteIndex] = useState(11);
  const classes = useStyles();
  
  function change(rev, e = rub) {
    const {nominal, value} = rows[valuteIndex];
    if(rev == 'rub' && e != 0){
      setVal(((e * nominal) /  value).toFixed(2))
    } else if(rev == 'val'){
      setRub(((e / nominal) * value).toFixed(2))
    } 
  }
  
  const handleChangeRub = (e) => {
    setRub(e.target.value);
    // setTimeout(change('rub',), 12)
    change('rub', e.target.value);
  }
  const handleChangeVar = async (event) => {
    setValuteIndex(event.target.value);
    change('rub');
  };
  const handleChangeVal = (e) => {
    setVal(e.target.value);
    change('val', e.target.value);
  }

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
          // placeholder="Placeholder"
          value={rub}
          onChange={handleChangeRub}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
        <FormControl className={classes.formControl}>
          <Select
            value={valuteIndex}
            onChange={handleChangeVar}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
              Выбор валюты
          </MenuItem>
            {rows && rows.map((row, index) => {
              return (
                <MenuItem value={index}>{row.charCode}</MenuItem>
              )
            })}
          </Select>
          <FormHelperText>ВЫбор валюты</FormHelperText>
        </FormControl>
        <TextField
          label="Сумма в валюте"
          id="outlined-size-normal"
          variant="outlined"
          // placeholder="Placeholder"
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
