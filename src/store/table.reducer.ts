import * as R from "ramda";
import { TableModel } from "../models/table.model";
import { Actions, TableActions } from "./table.actions";

export interface TableState {
  model: TableModel;
  rows: number[];
  columns: number[];
}

const initialState: TableState = {
  model: {},
  rows: [],
  columns: []
};

const editCellReducer = (action: Actions) =>
  R.assocPath(
    ["model", action.payload.row, action.payload.column],
    action.payload.value
  );

const addColumnReducer = (_: Actions) => (state: TableState) => {
  const newColumnId = (R.last(state.columns) || 0) + 1;
  return R.evolve({
    columns: R.append(newColumnId),
    model: R.mapObjIndexed(val => R.assoc(String(newColumnId), "", val))
  })(state);
};

const addRowReducer = (_: Actions) => (state: TableState) => {
  const newRowid = (R.last(state.rows) || 0) + 1;
  const newRow = state.columns.reduce(
    (acc, curr) => R.assoc(String(curr), "", acc),
    {}
  );
  return R.evolve({
    rows: R.append(newRowid),
    model: R.assoc(String(newRowid), newRow)
  })(state);
};

const removeColumnReducer = (action: Actions) => (state: TableState) => {
  const columnIdToRemove = action.payload;
  return R.evolve({
    columns: R.reject(R.equals(columnIdToRemove)) as any,
    model: R.mapObjIndexed(val => R.dissoc(String(columnIdToRemove), val))
  })(state);
};

const removeRowReducer = (action: Actions) => (state: TableState) => {
  const rowIdToRemove = action.payload;
  return R.evolve({
    rows: R.reject(R.equals(rowIdToRemove)) as any,
    model: R.dissoc(String(rowIdToRemove))
  })(state);
};

const reducers = {
  [TableActions.EDIT_CELL]: editCellReducer,
  [TableActions.ADD_COLUMN]: addColumnReducer,
  [TableActions.ADD_ROW]: addRowReducer,
  [TableActions.REMOVE_ROW]: removeRowReducer,
  [TableActions.REMOVE_COLUMN]: removeColumnReducer
};

const selectReducer = (actionType: string) =>
  reducers[actionType] || R.always(R.identity);

export function tableReducer(state = initialState, action: Actions) {
  return selectReducer(action.type)(action)(state);
}
