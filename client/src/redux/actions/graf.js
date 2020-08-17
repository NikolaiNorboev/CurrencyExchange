import { SETINDEX, INDEXDEFAULT, SETSTART, SETEND } from '../actionsType';

export function setIndex (num) {
  return {
    type: SETINDEX,
    num,
  }
}

export function indexDefault () {
  return {
    type: INDEXDEFAULT,
  }
}

export function setStart (str) {
  return {
    type: SETSTART,
    str,
  }
}

export function setEnd (str) {
  return {
    type: SETEND,
    str,
  }
}
