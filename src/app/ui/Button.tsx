import clsx from "clsx";
import style from "./ui.module.scss";

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  onClick,
  disabled = false,
  type = "button",
}) => {
  const _className = clsx(className, style.Button, disabled && style.disabled);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.();
  };

  return (
    <button
      type={type}
      className={_className}
      onClick={handleClick}
      aria-disabled={disabled}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
