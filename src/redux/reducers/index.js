import { combineReducers } from "redux";

import AuthReducer from "./auth";
import DashboardReducer from "./dashboard";
import ProfileReducer from "./profile";

const appReducer = () =>
  combineReducers({
    auth: AuthReducer,
    dashboard: DashboardReducer,
    profile: ProfileReducer
  });

export default appReducer;
