import { useAppDispatch, useAppSelector } from "@app/hooks/redux";
import { toggle, set } from "@app/store/themeSlice";
import type { Theme } from "@app/types/theme";

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  const toggleTheme = () => dispatch(toggle());
  const setTheme = (newTheme: Theme) => dispatch(set(newTheme));

  return { theme, toggleTheme, setTheme };
};
