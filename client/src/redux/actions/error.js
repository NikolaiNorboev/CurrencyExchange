import { GETERROR, DELERROR } from '../actionsType';

export function getError (str) {
  return {
    type: GETERROR,
    str,
  }
}

export function delError () {
  return {
    type: DELERROR,
  }
}
