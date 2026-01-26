import { all } from "redux-saga/effects";
import hotelsSaga from "./hotelsSaga/hotelsSaga";

export default function* rootSaga() {
  yield all([
    hotelsSaga(),
  ]);
}