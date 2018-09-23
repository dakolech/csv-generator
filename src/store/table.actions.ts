import { Action } from 'redux';

export enum TableActions {
  EDIT_CELL = '[Table]: edit cell',
  ADD_COLUMN = '[Table]: add column',
  REMOVE_COLUMN = '[Table]: remove column',
  ADD_ROW = '[Table]: add row',
  REMOVE_ROW = '[Table]: remove row',
  DOWNLOAD_CSV = '[Table]: download csv',
  DOWNLOAD_CSV_COMPLETED = '[Table]: download csv completed',
}

export interface EditCellPayload {
  value: string;
  row: number;
  column: number;
}

export interface EditCellAction extends Action {
  payload: EditCellPayload;
}

export interface RemoveColumnAction extends Action {
  payload: number;
}

export interface RemoveRowAction extends Action {
  payload: number;
}

export type Actions = EditCellAction & RemoveColumnAction & RemoveRowAction & Action;

function newAction <P, A extends Action>(type: TableActions) {
  return (payload?: P): A => ({ type, payload }) as any;
}

export const editCell =
  newAction<number, EditCellAction>(TableActions.EDIT_CELL);

export const addColumn =
  newAction<number, Action>(TableActions.ADD_COLUMN);

export const removeColumn =
  newAction<number, RemoveColumnAction>(TableActions.REMOVE_COLUMN);

export const addRow =
  newAction<number, Action>(TableActions.ADD_ROW);

export const removeRow =
  newAction<number, RemoveRowAction>(TableActions.REMOVE_ROW);

export const downloadCSV =
  newAction<number, Action>(TableActions.DOWNLOAD_CSV);

export const downloadCSVCompleted =
  newAction<number, Action>(TableActions.DOWNLOAD_CSV_COMPLETED);


