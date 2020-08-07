import { useDispatch } from 'react-redux';
import { getTodayCurrency } from '../../redux/actions/data';
import { getError } from '../../redux/actions/error';


export default async () => {
  const dispatch = useDispatch();
  const response = await fetch('/api/today');
  const json = await response.json();
  if (response.status === 200) {
    dispatch(getTodayCurrency(json));
  } else {
    dispatch(getError(json.message));
  }
  return null;
}
 