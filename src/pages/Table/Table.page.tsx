import * as R from "ramda";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { ButtonComponent } from "../../components/Buttons/Button.component";
import { RemoveButtonComponent } from "../../components/Buttons/Remove-Button.component";
import { ContainerComponent } from "../../components/Container/Container.component";
import { TableButtonContainerComponent } from "../../components/Table/Table-Button-Container.component";
import { TableCellComponent } from "../../components/Table/Table-Cell.component";
import { TableContainerComponent } from "../../components/Table/Table-Container.component";
import { TableRowComponent } from "../../components/Table/Table-Row.component";
import { TableComponent } from "../../components/Table/Table.component";
import { AppState } from "../../reducers";
import {
  addColumn,
  addRow,
  downloadCSV,
  removeColumn,
  removeRow
} from "../../store/table.actions";
import { CellComponent } from "./components/Cell.component";

interface StoreProps {
  columns: number[];
  rows: number[];
}

interface DispatchProps {
  addColumn: () => void;
  addRow: () => void;
  removeColumn: (val: number) => void;
  removeRow: (val: number) => void;
  downloadCSV: () => void;
}

interface StateProps {
  page: number;
}

export class Table extends React.PureComponent<
  StoreProps & DispatchProps,
  StateProps
> {
  constructor(props: StoreProps & DispatchProps) {
    super(props);
    this.addColumn = this.addColumn.bind(this);
    this.addRow = this.addRow.bind(this);
    this.downloadCSV = this.downloadCSV.bind(this);
  }

  public addColumn() {
    this.props.addColumn();
  }

  public addRow() {
    this.props.addRow();
  }

  public downloadCSV() {
    this.props.downloadCSV();
  }

  public render() {
    return (
      <ContainerComponent direction="column">
        <ContainerComponent>
          <ButtonComponent onClick={this.addColumn}>
            Add new column
          </ButtonComponent>
          <ButtonComponent onClick={this.addRow}>Add new row</ButtonComponent>
          <ButtonComponent onClick={this.downloadCSV}>
            Download CSV
          </ButtonComponent>
        </ContainerComponent>
        <TableContainerComponent>
          <TableComponent>
            <thead>
              <tr>
                <th />
                {this.props.columns.map((columnId, columnIndex) => (
                  <th key={columnId}>
                    <TableButtonContainerComponent>
                      {columnIndex + 1}
                      <RemoveButtonComponent
                        onClick={this.props.removeColumn.bind(this, columnId)}
                      >
                        x
                      </RemoveButtonComponent>
                    </TableButtonContainerComponent>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.props.rows.map((rowId, rowIndex) => (
                <TableRowComponent key={rowId}>
                  <TableCellComponent>
                    <TableButtonContainerComponent>
                      {rowIndex + 1}
                      <RemoveButtonComponent
                        onClick={this.props.removeRow.bind(this, rowId)}
                      >
                        x
                      </RemoveButtonComponent>
                    </TableButtonContainerComponent>
                  </TableCellComponent>
                  {this.props.columns.map(columnId => (
                    <TableCellComponent key={columnId}>
                      <CellComponent row={rowId} column={columnId} />
                    </TableCellComponent>
                  ))}
                </TableRowComponent>
              ))}
            </tbody>
          </TableComponent>
        </TableContainerComponent>
      </ContainerComponent>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators(
    { addColumn, addRow, removeColumn, removeRow, downloadCSV },
    dispatch
  );

const mapStateToProps: (state: AppState) => StoreProps = R.applySpec({
  columns: R.path(["table", "columns"]),
  rows: R.path(["table", "rows"])
});

export const TablePage = connect<StoreProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Table);
