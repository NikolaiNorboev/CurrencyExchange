import React, { useState, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import Menu from '../graf/Menu';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';


export default function Graf() {
  
  const rows = useSelector(state => state.data.valute);
  const {index, startDate, endDate} = useSelector(state => state.graf);
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

  async function getData() {
    const { id, nominal, name } = rows[index];
    if( startDate && endDate ) {
      const responce = await fetch('/api/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          startDate,
          endDate,
        }),
      });
      const json = await responce.json();
  
      const textTitle = await `Курс обмена ${nominal} ${name} к Рублю с ${startDate} по ${endDate}`;
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
  }
  
  useLayoutEffect(() => {
    getData();
  }, [index, startDate, endDate])

 
  return (
    <>
      <Menu/>
      <HighchartsReact
        highcharts={Highcharts}
        // constructorType={'stockChart'}
        constructorType={"chart"}
        options={chartOptions}
      />
    </>
  )
}
