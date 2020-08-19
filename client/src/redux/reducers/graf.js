import { SETINDEX, SETSTART, SETEND, SETENDANDSTART } from '../actionsType';

export default (state = {index: 10}, action) => {
  switch (action.type) {
    case SETINDEX:
      return { ...state, index: action.num };
    case SETSTART:
      return { ...state, startDate: action.str };
    case SETEND:
      return { ...state, endDate: action.str };
    case SETENDANDSTART:
      return {
        ...state,  
        ...action.obj
      }
    default:
      return state;
  }
};
