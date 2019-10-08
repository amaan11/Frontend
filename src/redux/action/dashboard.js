import {
  GET_RESTAURANT_CITY_REQUEST,
  GET_RESTAURANT_CITY_SUCCESS,
  BOOK_TABLE_REQUEST,
  BOOK_TABLE_SUCCESS
} from "./types";
export const getRestaurantByCityRequest = payload => {
  return {
    type: GET_RESTAURANT_CITY_REQUEST,
    payload
  };
};

export const getRestaurantByCitySuccess = response => {
  return {
    type: GET_RESTAURANT_CITY_SUCCESS,
    response
  };
};

export const bookTableRequest = payload => {
  return {
    type: BOOK_TABLE_REQUEST,
    payload
  };
};
export const bookTableSuccess = response => {
  return {
    type: BOOK_TABLE_SUCCESS,
    response
  };
};
