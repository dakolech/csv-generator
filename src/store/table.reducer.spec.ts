import {
  addColumn,
  addRow,
  editCell,
  removeColumn,
  removeRow
} from "./table.actions";
import { tableReducer, TableState } from "./table.reducer";

const initialState: TableState = {
  model: {},
  rows: [],
  columns: []
};

describe("TableReducer", () => {
  it("should return initial state at the beginning", () => {
    expect(tableReducer(undefined, { type: "someAction" })).toEqual(
      initialState
    );
  });

  describe("when state has not columns and rows", () => {
    const state: TableState = {
      model: {},
      rows: [],
      columns: []
    };

    describe("and add new column action is dispatched", () => {
      const expectedState: TableState = {
        model: {},
        rows: [],
        columns: [1]
      };

      it("should add new column", () => {
        expect(tableReducer(state, addColumn())).toEqual(expectedState);
      });
    });

    describe("and add new row action is dispatched", () => {
      const expectedState: TableState = {
        model: {
          1: {}
        },
        rows: [1],
        columns: []
      };

      it("should add new row", () => {
        expect(tableReducer(state, addRow())).toEqual(expectedState);
      });
    });
  });

  describe("when state has columns and rows", () => {
    const state: TableState = {
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
    };

    describe("and edit cell action (row: 3, column: 2) is dispatched", () => {
      const value = "new Value";
      const expectedState: TableState = {
        model: {
          1: {
            2: "",
            3: "something"
          },
          3: {
            2: value,
            3: "value"
          },
          4: {
            2: "ux",
            3: "pin"
          }
        },
        rows: [1, 3, 4],
        columns: [2, 3]
      };

      it("should modify cell value", () => {
        expect(
          tableReducer(state, editCell({ value, row: 3, column: 2 }))
        ).toEqual(expectedState);
      });
    });

    describe("and add new column action is dispatched", () => {
      const expectedState: TableState = {
        model: {
          1: {
            2: "",
            3: "something",
            4: ""
          },
          3: {
            2: "another",
            3: "value",
            4: ""
          },
          4: {
            2: "ux",
            3: "pin",
            4: ""
          }
        },
        rows: [1, 3, 4],
        columns: [2, 3, 4]
      };

      it("should add new column", () => {
        expect(tableReducer(state, addColumn())).toEqual(expectedState);
      });
    });

    describe("and add new row action is dispatched", () => {
      const expectedState: TableState = {
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
          },
          5: {
            2: "",
            3: ""
          }
        },
        rows: [1, 3, 4, 5],
        columns: [2, 3]
      };

      it("should add new row", () => {
        expect(tableReducer(state, addRow())).toEqual(expectedState);
      });
    });

    describe("and remove row action (3) is dispatched", () => {
      const expectedState: TableState = {
        model: {
          1: {
            2: "",
            3: "something"
          },
          4: {
            2: "ux",
            3: "pin"
          }
        },
        rows: [1, 4],
        columns: [2, 3]
      };

      it("should remove third row", () => {
        expect(tableReducer(state, removeRow(3))).toEqual(expectedState);
      });
    });

    describe("and remove column action (3) is dispatched", () => {
      const expectedState: TableState = {
        model: {
          1: {
            2: ""
          },
          3: {
            2: "another"
          },
          4: {
            2: "ux"
          }
        },
        rows: [1, 3, 4],
        columns: [2]
      };

      it("should remove third column", () => {
        expect(tableReducer(state, removeColumn(3))).toEqual(expectedState);
      });
    });
  });
});
