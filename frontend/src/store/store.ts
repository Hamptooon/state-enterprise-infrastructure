import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import infrastructureReducer from "./slice";
import { RootState } from "../types";

export const store = configureStore({
    reducer: {
        infrastructure: infrastructureReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
