import { put, call, fork, takeLatest } from "redux-saga/effects";
import Auth from "../Services/Auth";
import {
    loginSuccess,
    loginFailed,
} from "../redux/action/auth";
import {
    LOGIN_REQUEST,
} from "../redux/action/types";


function loginRequestAPICall(payload) {
    return Auth.authenticate(payload);
}


function* loginSaga(payload) {
    try {
        const response = yield call(loginRequestAPICall, payload.payload);

        yield localStorage.setItem("token", response.data.token);

        yield put(loginSuccess(response.data.token, payload.payload));

        // yield put(push("/dashboard"));
    } catch (error) {

        yield put(loginFailed(error.data.message));
    }
}

function* loginRequestListener() {
    yield takeLatest(LOGIN_REQUEST, loginSaga);
}


export default function* authSaga() {
    yield fork(loginRequestListener)
}
