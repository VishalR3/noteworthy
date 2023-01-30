import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import notesReducer from "./features/notesReducer";
import saga from "./saga";

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { notes: notesReducer },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware);
  },
});

sagaMiddleware.run(saga);

export default store;
