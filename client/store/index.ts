import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import languageReducer from "./slices/languageSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
