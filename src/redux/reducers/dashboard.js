import { GET_RESTAURANT_CITY_SUCCESS } from "../action/types";

const intialState = {
  restaurants: []
};

export default function dashboardReducer(state = intialState, action) {
  switch (action.type) {
    case GET_RESTAURANT_CITY_SUCCESS:
      return { ...state, restaurants: action.response.restaurants };
    default:
      return state;
  }
}
