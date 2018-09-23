import * as R from 'ramda';
import { Actions, TableActions } from './table.actions';

export interface TableState {
  asd?: any;
}

const initialState: TableState = {
};

const startRequestReducer = (_: Actions) => R.evolve({
  isPending: R.T,
  isError: R.F,
});


const reducers = {
  [TableActions.INIT]: startRequestReducer,
};

const selectReducer = (actionType: string) => reducers[actionType] || R.always(R.identity);

export function tableReducer(state = initialState, action: Actions) {
  return selectReducer(action.type)(action)(state);
}
