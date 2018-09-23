import { tableReducer, TableState } from './store/table.reducer';

export interface AppState {
  table: TableState,
}

export const reducers = {
  table: tableReducer,
};
