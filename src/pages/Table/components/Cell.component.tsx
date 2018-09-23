import * as R from "ramda";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { TableInputComponent } from "../../../components/Table/Table-Input.component";
import { AppState } from "../../../reducers";
import { editCell, EditCellPayload } from "../../../store/table.actions";

interface StoreProps {
  cell?: string;
}

interface DispatchProps {
  editCell: (value: EditCellPayload) => void;
}

interface OwnProps {
  column: number;
  row: number;
}

type ComponentProps = StoreProps & DispatchProps & OwnProps;

export class Cell extends React.PureComponent<ComponentProps> {
  constructor(props: ComponentProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  public onChange(event: Event) {
    const { column, row } = this.props;
    this.props.editCell({ column, row, value: (event.target as any).value });
  }

  public render() {
    return (
      <TableInputComponent
        type="text"
        onChange={this.onChange}
        value={this.props.cell}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({ editCell }, dispatch);

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  cell: R.path<string>(["table", "model", ownProps.row, ownProps.column], state)
});

export const CellComponent = connect<StoreProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps as any
)(Cell);
