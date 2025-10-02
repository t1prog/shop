import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Theme, ThemeState } from "@app/types/theme";
import { storage } from "@app/utils/localStorage";

const initialState: ThemeState = {
  theme: storage.get("theme", "dark"),
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
