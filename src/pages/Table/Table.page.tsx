import * as R from 'ramda';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppState } from '../../reducers';
import { init } from '../../store/table.actions';

interface StoreProps {
  asd: any;
}

interface DispatchProps {
  init: () => void;
}

interface StateProps {
  page: number;
}

export class Table extends React.Component<StoreProps & DispatchProps, StateProps> {
  constructor(props: StoreProps & DispatchProps) {
    super(props);

  }

  public render() {
    return (
      <div>Table</div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators(
  { init },
  dispatch,
);

const mapStateToProps: (state: AppState) => StoreProps = R.applySpec({
});

export const TablePage =
  connect<StoreProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Table);

