import { configureStore } from "@reduxjs/toolkit";
import theme from "./themeSlice";
import auth from "./authSlice";

export const store = configureStore({
  reducer: {
    theme: theme,
    auth: auth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
