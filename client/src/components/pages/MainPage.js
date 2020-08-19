import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTodayCurrency } from '../../redux/actions/data';
import { setEndAndStart } from '../../redux/actions/graf';
import Options from '../main/Options';
import { format, subDays } from 'date-fns';

function MainPage() {

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/data');
      const json = await response.json();
      dispatch(getTodayCurrency(json));
      dispatch(setEndAndStart({
        startDate: format(subDays(new Date(), 7), 'dd/MM/yyyy'), 
        endDate: format(new Date(), 'dd/MM/yyyy')
      }))

    })();
  }, []);

  return (
    <div>
      <Options />
    </div>
  )
}

export default MainPage;
