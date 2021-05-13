import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { configureStore, Action, AnyAction } from "@reduxjs/toolkit";

import rootReducer from "./reducers";

export const history: any = createBrowserHistory();
const reducer = rootReducer(history);
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      routerMiddleware(history) as ThunkDispatch<
        RootState,
        undefined,
        AnyAction
      >
    ),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export default store;
