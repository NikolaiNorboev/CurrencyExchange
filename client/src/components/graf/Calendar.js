import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { setStart, setEnd } from '../../redux/actions/graf';
import DatePicker, { registerLocale } from "react-datepicker";
import { format, subDays } from 'date-fns'
import ru from 'date-fns/locale/ru';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('ru', ru)

export default function Calendar() {
  const dispatch = useDispatch();
  const [startDateCalendar, setStartDateCalendar] = useState(new Date());
  const [endDateCalendar, setEndDateCalendar] = useState(new Date());
  const setStartDate = (date) => {
    dispatch(setStart(format(new Date(date), 'dd/MM/yyyy')))
    setStartDateCalendar(date)
  }
  const setEndDate = (date) => {
    dispatch(setEnd(format(new Date(date), 'dd/MM/yyyy')))
    setEndDateCalendar(date)
  }

  return (
    <div>
      <DatePicker
        locale="ru"
        selected={startDateCalendar}
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={startDateCalendar}
        endDate={endDateCalendar}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
      <DatePicker
        locale="ru"
        selected={endDateCalendar}
        onChange={date => setEndDate(date)}
        selectsEnd
        startDate={startDateCalendar}
        endDate={endDateCalendar}
        minDate={startDateCalendar}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
    </div>
  );
}
