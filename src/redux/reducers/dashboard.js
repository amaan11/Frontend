import {
  GET_RESTAURANT_CITY_SUCCESS,
  BOOK_TABLE_SUCCESS
} from "../action/types";

const intialState = {
  restaurants: [],
  tableBookings: []
};

export default function dashboardReducer(state = intialState, action) {
  switch (action.type) {
    case GET_RESTAURANT_CITY_SUCCESS:
      return { ...state, restaurants: action.response.restaurants };
    case BOOK_TABLE_SUCCESS:
      return {
        ...state,
        tableBookings: [...state.tableBookings, action.response.data]
      };
    default:
      return state;
  }
}
