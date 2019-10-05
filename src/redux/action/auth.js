import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  POST_SIGNUP_REQUEST
} from "./types";
export const loginRequest = payload => {
  return {
    type: LOGIN_REQUEST,
    payload
  };
};
export const loginSuccess = response => {
  return {
    type: LOGIN_SUCCESS,
    response
  };
};
export const loginFailed = response => {
  return {
    type: LOGIN_FAILED,
    response
  };
};
export const postSignupRequest = payload => {
  return {
    type: POST_SIGNUP_REQUEST,
    payload
  };
};
