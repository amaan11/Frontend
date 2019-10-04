import {
  GET_RESTAURANT_CITY_REQUEST,
  GET_RESTAURANT_CITY_SUCCESS
} from "./types";
export const getRestaurantByCityRequest = payload => {
  console.log("Action>>>");
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
