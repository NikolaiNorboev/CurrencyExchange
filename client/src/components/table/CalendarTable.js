import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTodayCurrency } from '../../redux/actions/data';
import DatePicker, { registerLocale } from "react-datepicker";
import { format, startOfTomorrow } from 'date-fns'
import ru from 'date-fns/locale/ru';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('ru', ru)

export default function Calendar() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());

  const handlerDate = async (date) => {
    setStartDate(date)
    const query = format(new Date(date), 'dd/MM/yyyy')
    const response = await fetch(`/api/data?date=${query}`);
    const json = await response.json();
    dispatch(getTodayCurrency(json));
  }

  return (
    <div>
      <DatePicker
        locale="ru"
        selected={startDate}
        dateFormat="dd/MM/yyyy"
        onChange={date => handlerDate(date)}
        maxDate={startOfTomorrow()}
        withPortal
        peekNextMonth
        showMonthDropdown
        showYearDropdown
      />
    </div>
  );
}
