import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/index";
import rootSaga from "../redux-saga";
import history from "../history";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "dashboard"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const intialState = {};

function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  const store = createStore(
    persistedReducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  let persistor = persistStore(store, null, () => {});
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
}

export default configureStore();
