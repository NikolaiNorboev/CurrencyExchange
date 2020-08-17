import { useSelector } from 'react-redux';

export default async function getData() {
  const rows = useSelector(state => state.data.valute);
  const { id, nominal, name } = rows[index];
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
