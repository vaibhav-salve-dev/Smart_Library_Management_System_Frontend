import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import bookReducer from "../features/books/bookSlice";
import borrowReducer from "../features/borrow/borrowSlice";
import analyticsReducer from "../features/analytics/analyticsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    borrow: borrowReducer,
    analytics:analyticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;