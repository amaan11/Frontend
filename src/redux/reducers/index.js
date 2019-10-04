import { combineReducers } from "redux";

import AuthReducer from "./auth";
import DashboardReducer from "./dashboard";

const appReducer = () =>
  combineReducers({
    auth: AuthReducer,
    dashboard: DashboardReducer
  });

export default appReducer;
