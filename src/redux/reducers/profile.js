import { ADD_ADRESS_REQUEST } from "../action/types";

const intialState = {
  delieveryLocation: [{ area: "", address: "", landmark: "", locationType: "" }]
};

export default function profileReducer(state = intialState, action) {
  switch (action.type) {
    case ADD_ADRESS_REQUEST:
      return {
        ...state,
        delieveryLocation: [...state.delieveryLocation, action.payload]
      };
    default:
      return state;
  }
}
