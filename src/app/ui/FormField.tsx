import Input from "./Input";
import clsx from "clsx";
import styles from "./ui.module.scss";

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  error?: string;
  touched?: boolean;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  name,
  value,
  error,
  touched,
  placeholder,
  onChange,
  onBlur,
}) => {
  return (
    <div className={(styles.FormField, "relative mb-[4px]")}>
      <div className={(styles.FormFieldContainer, "flex gap-2 justify-between items-end")}>
        <label htmlFor={name} className={(styles.FormFieldLabel, "font-semibold")}>
          {label}
        </label>
        <Input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          error={!!(touched && error)}
          autoComplete="off"
          className={clsx(styles.FormFieldInput, "px-2 py-1 font-semibold")}
        />
      </div>
      {touched && error && (
        <span
          className={clsx(
            styles.FormFieldErrorMessage,
            "text-xs text-red-400 block absolute right-0",
          )}
        >
          {error}
        </span>
      )}
    </div>
  );
};
