import { ADD_ADRESS_REQUEST } from "./types";
export const addAdressRequest = payload => {
  return {
    type: ADD_ADRESS_REQUEST,
    payload
  };
};
