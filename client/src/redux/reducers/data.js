import { TODAYCURRENCY } from '../actionsType';

const initialState = {
  // date: '01.01.01',
  // valute: new Array(34).fill({name: 'test', charCode: 1, nominal: 2, value: 3}),
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TODAYCURRENCY:
      return action.obj;
    default:
      return state;
  }
};
