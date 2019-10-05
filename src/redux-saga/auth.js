import { put, call, fork, takeLatest } from "redux-saga/effects";
import { push } from "connected-react-router";
import Auth from "../Services/Auth";
import {
  loginSuccess,
  loginFailed,
  postSignupRequest
} from "../redux/action/auth";
import { LOGIN_REQUEST, POST_SIGNUP_REQUEST } from "../redux/action/types";

function loginRequestAPICall(payload) {
  return Auth.authenticate(payload);
}
function postSignupRequestApi(payload) {
  return Auth.register(payload);
}

function* loginSaga(payload) {
  try {
    const response = yield call(loginRequestAPICall, payload.payload);

    // yield put(loginSuccess(response.data.token, payload.payload));

    console.log("resss>>>", response);
    yield put(push("/dashboard"));
  } catch (error) {
    // yield put(loginFailed(error.data.message));
  }
}
function* postSignupRequestSaga(payload) {
  try {
    const response = yield call(postSignupRequestApi, payload.payload);

    // yield put(loginSuccess(response.data.token, payload.payload));

    yield put(push("/dashboard"));
  } catch (error) {}
}

function* loginRequestListener() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

function* postSignupRequestListener() {
  yield takeLatest(POST_SIGNUP_REQUEST, postSignupRequestSaga);
}

export default function* authSaga() {
  yield fork(loginRequestListener);
  yield fork(postSignupRequestListener);
}
