import { combineReducers } from "redux";
 import {all} from "redux-saga/effects";

import * as auth from "../app/modules/_auth/_redux/authRedux";
import * as layout from "../app/layout/_redux/layoutRedux";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  layout: layout.reducer,
});

export function* rootSaga() {
}
