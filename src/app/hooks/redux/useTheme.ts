import { useAppDispatch, useAppSelector } from "@app/hooks/redux";
import { toggle, set } from "@app/store/themeSlice";
import type { Theme } from "@app/types/theme";

export const useTheme = () => useAppSelector((state) => state.theme.theme);
export const useThemeActions = () => {
  const dispatch = useAppDispatch();
  return {
    toggleTheme: () => dispatch(toggle()),
    setTheme: (theme: Theme) => dispatch(set(theme)),
  };
};
