import { TODAYCURRENCY } from '../actionsType';

export function getTodayCurrency (obj) {
  return {
    type: TODAYCURRENCY,
    obj,
  }
}
