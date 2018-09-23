import * as R from 'ramda';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TableCellComponent } from '../../components/Table-Cell/Table-Cell.component';
import { TableRowComponent } from '../../components/Table-Row/Table-Row.component';
import { TableComponent } from '../../components/Table/Table.component';
import { AppState } from '../../reducers';
import { addColumn, addRow, removeColumn, removeRow } from '../../store/table.actions';
import { CellComponent } from './components/Cell.component';

interface StoreProps {
  columns: number[];
  rows: number[];
}

interface DispatchProps {
  addColumn: any;
  addRow: any;
  removeColumn: any;
  removeRow: any;
}

interface StateProps {
  page: number;
}

export class Table extends React.PureComponent<StoreProps & DispatchProps, StateProps> {
  constructor(props: StoreProps & DispatchProps) {
    super(props);
    this.addColumn = this.addColumn.bind(this);
    this.addRow = this.addRow.bind(this);
    // this.removeRow = this.removeRow.bind(this);
    // this.removeColumn = this.removeColumn.bind(this);
  }

  public addColumn() {
    this.props.addColumn();
  }

  public addRow() {
    this.props.addRow();
  }


  public render() {
    console.log(this.props);
    return (
      <div>
        <TableComponent>
          <thead>
            <tr>
              <th/>
              {this.props.columns.map((columnId, columnIndex) => (
                <th key={columnId}>{columnIndex + 1} <button onClick={this.props.removeColumn.bind(this, columnId)}>x</button></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.rows.map((rowId, rowIndex) => (
              <TableRowComponent key={rowId}>
                <TableCellComponent>{rowIndex + 1} <button onClick={this.props.removeRow.bind(this, rowId)}>x</button></TableCellComponent>
                {this.props.columns.map((columnId) => (
                  <TableCellComponent key={columnId}>
                    <CellComponent row={rowId} column={columnId} />
                  </TableCellComponent>
                ))}
              </TableRowComponent>
            ))}
          </tbody>
        </TableComponent>
        <button onClick={this.addColumn}>Add Column</button>
        <button onClick={this.addRow}>Add Row</button>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators(
  { addColumn, addRow, removeColumn, removeRow },
  dispatch,
);

const mapStateToProps: (state: AppState) => StoreProps = R.applySpec({
  columns: R.path(['table', 'columns']),
  rows: R.path(['table', 'rows']),
});

export const TablePage =
  connect<StoreProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Table);

