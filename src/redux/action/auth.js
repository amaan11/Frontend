import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS
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
export const SignupRequest = payload => {
  return {
    type: SIGNUP_REQUEST,
    payload
  };
};
export const signupSuccess = response => {
  return {
    type: SIGNUP_SUCCESS,
    response
  };
};
