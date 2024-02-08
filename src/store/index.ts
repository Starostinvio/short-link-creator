import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./export";
import { shortLinkReducer } from "./export";
import { statisticsReducer } from "./export";

const rootReducer = combineReducers({
  authReducer,
  shortLinkReducer,
  statisticsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
