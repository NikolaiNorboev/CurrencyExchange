import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIndex } from '../../redux/actions/graf';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectValute() {
  const dispatch = useDispatch();
  const rows = useSelector(state => state.data.valute);
  const index = useSelector(state => state.graf.index);
  const classes = useStyles();
  
  const handleChange = (e) => {
    dispatch(setIndex(e.target.value));
  }

  return(
    <FormControl className={classes.formControl}>
          <Select
            value={index}
            onChange={handleChange}
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
  )
}
