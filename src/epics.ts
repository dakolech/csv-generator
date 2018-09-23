import { combineEpics } from "redux-observable";
import { downloadCSVEpic } from "./store/table.epics";

export const epics = combineEpics(downloadCSVEpic);
