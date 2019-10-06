import { put, call, fork, takeLatest } from "redux-saga/effects";
import Auth from "../Services/Auth";
import swal from "sweetalert";
import history from "../history";
import { loginSuccess, loginFailed, signupSuccess } from "../redux/action/auth";
import { LOGIN_REQUEST, SIGNUP_REQUEST } from "../redux/action/types";

function loginRequestAPICall(payload) {
  return Auth.authenticate(payload);
}
function postSignupRequestApi(payload) {
  return Auth.register(payload);
}

function* loginSaga(payload) {
  try {
    const response = yield call(loginRequestAPICall, payload.payload);

    if (!response.isSuccess) {
      swal(response.data, "Please Try Again !!", "error");
      yield put(loginFailed(response));
    } else {
      yield put(loginSuccess(response));
      history.push("/dashboard");
    }
  } catch (error) {}
}
function* postSignupRequestSaga(payload) {
  try {
    const response = yield call(postSignupRequestApi, payload.payload);

    if (response.isSuccess) {
      yield put(signupSuccess(response));
    }

    history.push("/dashboard");
  } catch (error) {}
}

function* loginRequestListener() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

function* postSignupRequestListener() {
  yield takeLatest(SIGNUP_REQUEST, postSignupRequestSaga);
}

export default function* authSaga() {
  yield fork(loginRequestListener);
  yield fork(postSignupRequestListener);
}
