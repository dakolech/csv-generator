import { configure, mount, ReactWrapper } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { createEpicMiddleware } from "redux-observable";
import { ButtonComponent } from "../../components/Buttons/Button.component";
import { RemoveButtonComponent } from "../../components/Buttons/Remove-Button.component";
import { epics } from "../../epics";
import { AppState } from "../../reducers";
import {
  addColumn,
  addRow,
  downloadCSV,
  downloadCSVCompleted,
  removeColumn,
  removeRow
} from "../../store/table.actions";
import { CellComponent } from "./components/Cell.component";
import { TablePage } from "./Table.page";

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

describe("TablePage", () => {
  beforeEach(() => {
    const epicMiddleware = createEpicMiddleware();

    const mockStore = configureStore([epicMiddleware]);
    store = mockStore({ ...initialState });

    epicMiddleware.run(epics);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe("when component is mount", () => {
    beforeEach(() => {
      component = mount(
        <Provider store={store}>
          <TablePage />
        </Provider>
      );
    });

    it("should show 6 cell components", () => {
      expect(component.find(CellComponent).length).toBe(6);
    });

    describe("when add column button is clicked", () => {
      beforeEach(() => {
        component
          .find(ButtonComponent)
          .at(0)
          .simulate("click");
      });

      it("should call addColumn action", () => {
        expect(store.getActions()).toEqual([addColumn()]);
      });
    });

    describe("when add row button is clicked", () => {
      beforeEach(() => {
        component
          .find(ButtonComponent)
          .at(1)
          .simulate("click");
      });

      it("should call addRow action", () => {
        expect(store.getActions()).toEqual([addRow()]);
      });
    });

    describe("when download csv button is clicked", () => {
      beforeEach(() => {
        spyOn(window, "open");
        component
          .find(ButtonComponent)
          .at(2)
          .simulate("click");
      });

      it("should call downloadCSV action and downloadCSVComplete actions", () => {
        expect(store.getActions()).toEqual([
          downloadCSV(),
          downloadCSVCompleted()
        ]);
      });

      it("should call window.open with proper value", () => {
        expect(window.open).toHaveBeenCalledWith(
          "data:text/csv;charset=utf-8,,something%0D%0Aanother,value%0D%0Aux,pin%0D%0A"
        );
      });
    });

    describe("when remove second row button is clicked", () => {
      beforeEach(() => {
        component
          .find(RemoveButtonComponent)
          .at(3)
          .simulate("click");
      });

      it("should call removeRow action with 3 as an id", () => {
        expect(store.getActions()).toEqual([removeRow(3)]);
      });
    });

    describe("when remove second column button is clicked", () => {
      beforeEach(() => {
        component
          .find(RemoveButtonComponent)
          .at(1)
          .simulate("click");
      });

      it("should call removeRow action with 3 as an id", () => {
        expect(store.getActions()).toEqual([removeColumn(3)]);
      });
    });
  });
});
