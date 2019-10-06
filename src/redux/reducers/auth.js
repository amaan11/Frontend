import { LOGIN_SUCCESS, LOGIN_FAILED, SIGNUP_SUCCESS } from "../action/types";

const intialState = {
  user: [],
  errorMessage: ""
};
export default function authReducer(state = intialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.response.data };
    case LOGIN_FAILED:
      return { ...state, errorMessage: action.response.data };
    case SIGNUP_SUCCESS:
      return { ...state, user: action.response.data };
    default:
      return state;
  }
}
