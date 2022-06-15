import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducers } from "./reducers";

const middleware = [...getDefaultMiddleware()];

export const store = configureStore({
    reducer: reducers,
    middleware,
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
