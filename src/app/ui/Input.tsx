import { forwardRef } from "react";
import clsx from "clsx";
import styles from "./ui.module.scss";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, error, ...props }, ref) => {
  return (
    <input ref={ref} className={clsx(styles.Input, error && styles.error, className)} {...props} />
  );
});

Input.displayName = "Input";
export default Input;
