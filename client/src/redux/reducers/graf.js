import { SETINDEX, INDEXDEFAULT, SETSTART, SETEND } from '../actionsType';

export default (state = {index: 11}, action) => {
  switch (action.type) {
    case SETINDEX:
      return { ...state, index: action.num };
    case SETSTART:
      return { ...state, startDate: action.str };
    case SETEND:
      return { ...state, endDate: action.str };
    case INDEXDEFAULT:
      return { ...state, index: 11 };
    default:
      return state;
  }
};
