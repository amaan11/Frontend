import { LOGIN_SUCCESS, LOGIN_FAILED } from "../action/types"

const intialState = {

}
export default function authReducer(state = intialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log("action>>>")
        case LOGIN_FAILED:
            console.log("action>>>")
        default:
            return state
    }
}