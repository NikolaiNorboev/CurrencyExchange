import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTodayCurrency } from '../../redux/actions/data';
import Options from '../main/Options';

function MainPage() {

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/today');
      const json = await response.json();
      dispatch(getTodayCurrency(json));
    })();
  }, []);

  return (
    <div>
      <h1>Main</h1>
      <Options />
    </div>
  )
}

export default MainPage;
