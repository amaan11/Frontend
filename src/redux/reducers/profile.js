import { ADD_ADRESS_REQUEST } from "../action/types";

const intialState = {
  delieveryLocation: []
};

export default function profileReducer(state = intialState, action) {
  switch (action.type) {
    case ADD_ADRESS_REQUEST:
      const { payload } = action;

      return {
        ...state,
        delieveryLocation: intialState.delieveryLocation.concat({
          area: payload.area,
          address: payload.address,
          landmark: payload.landmark,
          locationType: payload.locationType
        })
      };
    default:
      return state;
  }
}
