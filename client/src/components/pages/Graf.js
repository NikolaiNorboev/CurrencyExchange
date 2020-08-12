import React, { useState } from 'react';
import moment from 'moment/min/moment-with-locales';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

moment.locale('en-in')

function Graf() {
  async function get7DayAgo() {
    const end = moment().format('L');
    const start = moment().subtract(7, 'days').format('L')
    const responce = await fetch('/api/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 'R01239',
        start,
        end,
      }),
    });
    const json = await responce.json();
    console.log(json);
    // console.log('end: ', end, ' start: ', start);
  }

  const [hoverData, setHoverData] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    xAxis: {
      categories: ['A', 'B', 'C'],
    },
    series: [
      { data: [1, 2, 3] }
    ],
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver(e) {
              setHoverData(e.target.category)
            }
          }
        }
      }
    }
  });

  const updateSeries = () => {
    setChartOptions({
      series: [
        { data: [Math.random() * 5, 2, 1] }
      ]
    });
  }

  return (
    <>
      <h3>Graf</h3>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
      <h3>Hovering over {hoverData}</h3>
      <button onClick={updateSeries}>Update Series</button>
      <button onClick={get7DayAgo}>7 day ago</button>
    </>
  )
}

export default Graf;
