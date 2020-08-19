import { SETINDEX, SETSTART, SETEND, SETENDANDSTART } from '../actionsType';

export function setIndex (num) {
  return {
    type: SETINDEX,
    num,
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

export function setEndAndStart (obj) {
  return {
    type: SETENDANDSTART,
    obj,
  }
}
