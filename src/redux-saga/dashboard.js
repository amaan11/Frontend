import { put, call, fork, takeLatest } from "redux-saga/effects";
import Auth from "../Services/Auth";
import { GET_RESTAURANT_CITY_REQUEST } from "../redux/action/types";
import { getRestaurantByCitySuccess } from "../redux/action/dashboard";

function getRestaurantApi(payload) {
  console.log("api");

  return Auth.getRestaurantByCity(payload);
}

function* getRestaurantSaga(payload) {
  try {
    console.log("saga>>>");

    const response = yield call(getRestaurantApi, payload.payload);
    console.log("response>>saga", response);
    yield put(getRestaurantByCitySuccess(response));
  } catch (error) {
    console.log("error>>", error);
  }
}

function* getRestaurantListener() {
  console.log("listener");
  yield takeLatest(GET_RESTAURANT_CITY_REQUEST, getRestaurantSaga);
}

export default function* dashboardSaga() {
  yield fork(getRestaurantListener);
}
