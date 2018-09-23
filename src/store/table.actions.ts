import { Action } from 'redux';

export enum TableActions {
  INIT = '[Table]: init',
}

export interface Init extends Action {
  payload: any;
}



export type Actions = Init;

function newAction <P, A extends Action>(type: TableActions) {
  return (payload?: P): A => ({ type, payload }) as any;
}

export const init =
  newAction<number, any>(TableActions.INIT);
