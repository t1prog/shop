import { useTheme, useThemeActions } from "@app/hooks/redux";
// import style from "./ThemeToggle.module.scss";
import clsx from "clsx";

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { toggleTheme } = useThemeActions();
  const theme = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked="true"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      onClick={toggleTheme}
      className={clsx(className, "")}
    >
      <span className="">🌓 {theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
};
