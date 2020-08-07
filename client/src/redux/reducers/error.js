import { GETERROR, DELERROR} from '../actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case GETERROR:
      return action.str;
    case DELERROR:
      return '';
    default:
      return state;
  }
};
