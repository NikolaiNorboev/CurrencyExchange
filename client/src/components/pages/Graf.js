import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Menu from '../graf/Menu';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import FileSaver from 'file-saver';
import Button from '@material-ui/core/Button';

export default function Graf() {
  
  const data = useSelector(state => state.data);
  const rows = data.valute;
  const {index, startDate, endDate} = useSelector(state => state.graf);
  const [title, setTitle] = useState();
  const [json, setJson] = useState({
    info: { startDate: '11.08.2020', endDate: '18.08.2020', id: 'R01239' },
    data: [
      { date: '11.08.2020', value: '86.8258' },
      { date: '12.08.2020', value: '85.9246' },
      { date: '13.08.2020', value: '85.9560' },
      { date: '14.08.2020', value: '87.0399' },
      { date: '15.08.2020', value: '86.4092' },
      { date: '18.08.2020', value: '86.4666' }
    ]
  });
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

  function getData() {
    const { id, nominal, name } = rows[index];

    if( startDate && endDate ) {
      fetch('/api/data', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          startDate,
          endDate,
        }),
      }
      )
      .then( responce => responce.json())
      .then( result => {
        setJson(result);
        const text = `Курс обмена ${nominal} ${name} к Рублю с ${startDate} по ${endDate}`
        setTitle(text);
        setChartOptions({
          title: {
            text: text,
          },
          xAxis: {
            categories: result.data.map(row => {return row.date}),
          },
          series: [
            { data: result.data.map(row => {return row.value}) },
          ],
        })
      })
    }
  }
  
  useEffect(() => { 
    getData()
  }, [index, startDate, endDate])

  useEffect(() => {  
    getData()
  }, [])

  function save() {
    const json2 = JSON.stringify(json)
    const blob = new Blob([json2], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, `${title}.json`);
  }

  return (
    <>
      <Menu/>
      <HighchartsReact
        highcharts={Highcharts}
        // constructorType={'stockChart'}
        constructorType={"chart"}
        options={chartOptions}
      />
      <Button onClick={() => save()}>Выгрузить данные</Button>
    </>
  )
}
