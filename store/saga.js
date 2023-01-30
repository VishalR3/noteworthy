import { all } from "redux-saga/effects";
import changeNoteSaga from "./sagas/changeNoteSaga";
import fetchNoteSaga from "./sagas/fetchNoteSaga";

export default function* rootSaga() {
  console.log("rootSaga");
  yield all([fetchNoteSaga(), changeNoteSaga()]);
}
