import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import "antd/dist/antd.css";

// Import Styles...
import "./App.css";

// Import Redux Store & Action...
import configStore, { history } from "../src/redux/store";

//Component imports
import Login from "./screens/Auth/login";
import Register from "./screens/Auth/Register";

import AuthenticatedRoute from "./AuthenticatedRoute"


function App() {
  let { store, persistor } = configStore;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Switch>
            <AuthenticatedRoute exact path="/login" component={Login} />
            <AuthenticatedRoute exact path="/register" component={Register} />

          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
