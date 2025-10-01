import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Theme, ThemeState } from "@app/types/theme";
import { storageGet } from "@app/utils/localStorage";

const initialState: ThemeState = {
  theme: storageGet("theme", "dark"),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    set: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const { toggle, set } = themeSlice.actions;
export default themeSlice.reducer;
