import * as R from 'ramda';
import { ActionsObservable } from 'redux-observable';
import { tap, withLatestFrom, map, pluck, mapTo } from 'rxjs/operators';
import { TableModel } from '../models/table.model';
import {
  Actions, downloadCSVCompleted, TableActions,
} from './table.actions';

export const downloadCSVEpic = (action: ActionsObservable<Actions>, state: any) => action
  .ofType(TableActions.DOWNLOAD_CSV)
  .pipe(
    withLatestFrom(state),
    map(R.last),
    pluck('table', 'model'),
    tap((model: TableModel) => {
      let csvContent = 'data:text/csv;charset=utf-8,';
      R.values(model).forEach((item) => {
        const row = R.values(item).join(',');
        csvContent += row + '\r\n';
      });

      const encodedUri = encodeURI(csvContent);
      window.open(encodedUri);
    }),
    mapTo(downloadCSVCompleted()),
  );


