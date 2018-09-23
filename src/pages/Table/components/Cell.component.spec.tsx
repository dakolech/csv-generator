import { configure, mount, ReactWrapper } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { createEpicMiddleware } from "redux-observable";
import { TableInputComponent } from "../../../components/Table/Table-Input.component";
import { epics } from "../../../epics";
import { AppState } from "../../../reducers";
import { editCell } from "../../../store/table.actions";
import { CellComponent } from "../components/Cell.component";

configure({ adapter: new Adapter() });

let component: ReactWrapper;
let store: any;

const initialState: AppState = {
  table: {
    model: {
      1: {
        2: "",
        3: "something"
      },
      3: {
        2: "another",
        3: "value"
      },
      4: {
        2: "ux",
        3: "pin"
      }
    },
    rows: [1, 3, 4],
    columns: [2, 3]
  }
};

describe("CellComponent", () => {
  beforeEach(() => {
    const epicMiddleware = createEpicMiddleware();

    const mockStore = configureStore([epicMiddleware]);
    store = mockStore({ ...initialState });

    epicMiddleware.run(epics);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe("when component is mount (row: 3, column: 2)", () => {
    beforeEach(() => {
      component = mount(
        <Provider store={store}>
          <CellComponent row={3} column={2} />
        </Provider>
      );
    });

    it("should show value from the store in the input", () => {
      expect(component.find(TableInputComponent).prop("value")).toBe(
        initialState.table.model[3][2]
      );
    });

    describe("when input has changed", () => {
      const newValue = "new value";
      beforeEach(() => {
        component
          .find(TableInputComponent)
          .simulate("change", { target: { value: newValue } });
      });

      it("should call editCell action with new value", () => {
        expect(store.getActions()).toEqual([
          editCell({ value: newValue, row: 3, column: 2 })
        ]);
      });
    });
  });
});
