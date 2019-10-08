import { put, call, fork, takeLatest } from "redux-saga/effects";
import Auth from "../Services/Auth";
import {
  GET_RESTAURANT_CITY_REQUEST,
  BOOK_TABLE_REQUEST
} from "../redux/action/types";
import {
  getRestaurantByCitySuccess,
  bookTableSuccess
} from "../redux/action/dashboard";
import swal from "sweetalert";

function getRestaurantApi(payload) {
  return Auth.getRestaurantByCity(payload);
}

function bookTableApi(payload) {
  return Auth.bookTable(payload);
}
function* getRestaurantSaga(payload) {
  try {
    const response = yield call(getRestaurantApi, payload.payload);
    yield put(getRestaurantByCitySuccess(response));
  } catch (error) {}
}
function* bookTableSaga(payload) {
  try {
    const response = yield call(bookTableApi, payload.payload);
    if (!response.isSuccess) {
      swal("Please Try Again", response.data, "error");
    } else {
      yield put(bookTableSuccess(response));
    }
  } catch (error) {}
}

function* getRestaurantListener() {
  yield takeLatest(GET_RESTAURANT_CITY_REQUEST, getRestaurantSaga);
}
function* bookTableListener() {
  yield takeLatest(BOOK_TABLE_REQUEST, bookTableSaga);
}

export default function* dashboardSaga() {
  yield fork(getRestaurantListener);
  yield fork(bookTableListener);
}
