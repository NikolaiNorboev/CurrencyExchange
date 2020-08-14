import React, { useState, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment/min/moment-with-locales';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

moment.locale('en-in')//Для упрошеного форматирования выбрал индийский вариант, т.к. при вызове метода формат можно передать только один аргумент

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Graf() {
  const rows = useSelector(state => state.data.valute);
  const [valuteID, setValuteId] = useState('R01239');
  const [index, setIndex] = useState(11);
  const [end, getEnd] = useState(moment().format('L'));
  const [start, getStart] = useState(moment().subtract(7, 'days').format('L'));
  const [chartOptions, setChartOptions] = useState({
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'USD to EUR exchange rate over time'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'Курс обмена'
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        },
        marker: {
          radius: 2
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },

    series: [{
      type: 'area',
    }]
  });

  const classes = useStyles();

  const handleChange = async (event) => {
    setIndex(event.target.value);
  };

  async function getData() {
    const {id, nominal, name} = rows[index];
    const responce = await fetch('/api/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        start,
        end,
      }),
    });
    const json = await responce.json();
    
    const textTitle = await `Курс обмена ${nominal} ${name} к Рублю с ${start} по ${end}`;
    setChartOptions({
      title: {
        text: textTitle,
      },
      xAxis: {
        categories: [...json.date],
      },
      series: [
        { data: [...json.valute] },
      ],
    })
    
  }

  useLayoutEffect(() => {
    getData();
  }, [index, start, end])

  function handleStart(day) {
    getStart(moment().subtract(day, 'days').format('L'))
  }
  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="baseline"
      >
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button onClick={() => handleStart(7)}>Неделя</Button>
          <Button onClick={() => handleStart(31)}>Месяц</Button>
          <Button onClick={() => handleStart(365)}>Год</Button>
        </ButtonGroup>
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
              return(
              <MenuItem value={index}>{row.charCode}</MenuItem>
              )
            })}
          </Select>
          <FormHelperText>ВЫбор валюты</FormHelperText>
        </FormControl>
      </Grid>

      <HighchartsReact
        highcharts={Highcharts}
        // constructorType={'stockChart'}
        constructorType={"chart"}
        options={chartOptions}
      />
    </>
  )
}

export default Graf;
