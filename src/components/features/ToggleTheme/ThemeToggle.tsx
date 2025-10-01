import { useTheme, useThemeActions } from "@app/hooks/redux";
import styles from "./ThemeToggle.module.scss";
import SunIcon from "@assets/svg/moon.min.svg?react";
import MoonIcon from "@assets/svg/sun.min.svg?react";
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
      className={clsx(className, styles.Toggle)}
    >
      {theme === "dark" ? (
        <MoonIcon fill="none" className={styles.Img} />
      ) : (
        <SunIcon fill="red" className={styles.Img} />
      )}
    </button>
  );
};
