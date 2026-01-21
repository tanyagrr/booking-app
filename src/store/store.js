import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import hotelsReducer from "./hotelsSlice";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,         
      serializableCheck: false, 
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);