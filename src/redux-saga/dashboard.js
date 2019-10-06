import { put, call, fork, takeLatest } from "redux-saga/effects";
import Auth from "../Services/Auth";
import { GET_RESTAURANT_CITY_REQUEST } from "../redux/action/types";
import { getRestaurantByCitySuccess } from "../redux/action/dashboard";

function getRestaurantApi(payload) {
  return Auth.getRestaurantByCity(payload);
}

function* getRestaurantSaga(payload) {
  try {
    const response = yield call(getRestaurantApi, payload.payload);
    yield put(getRestaurantByCitySuccess(response));
  } catch (error) {}
}

function* getRestaurantListener() {
  yield takeLatest(GET_RESTAURANT_CITY_REQUEST, getRestaurantSaga);
}

export default function* dashboardSaga() {
  yield fork(getRestaurantListener);
}
