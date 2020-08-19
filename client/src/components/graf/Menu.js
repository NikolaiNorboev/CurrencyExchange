import React from 'react';
import { useDispatch } from 'react-redux';
import { setEndAndStart } from '../../redux/actions/graf';
import Calendar from '../graf/Calendar';
import SelectValute from '../graf/SelectValute';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import { format, subDays } from 'date-fns'

export default function Menu() {
  const dispatch = useDispatch();
  function handleStart(num) {
    dispatch(setEndAndStart({
      startDate: format(subDays(new Date(), num), 'dd/MM/yyyy'), 
      endDate: format(new Date(), 'dd/MM/yyyy')
    }))
  }

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="baseline"
    >
      <Calendar />
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button onClick={() => handleStart(7)}>Неделя</Button>
        <Button onClick={() => handleStart(31)}>Месяц</Button>
        <Button onClick={() => handleStart(365)}>Год</Button>
      </ButtonGroup>
      <SelectValute />
    </Grid>
  )
}
