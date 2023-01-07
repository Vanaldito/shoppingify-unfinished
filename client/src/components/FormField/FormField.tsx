import { useState } from "react";
import "./FormField.css";

interface FormFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}

export default function FormField({
  label,
  className,
  onFocus,
  onBlur,
  ...props
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  className = `form-field ${isFocused ? "form-field--focused" : ""} ${
    className ?? ""
  }`.trim();

  function focusHandler(event: React.FocusEvent<HTMLInputElement>) {
    setIsFocused(true);

    onFocus && onFocus(event);
  }

  function blurHandler(event: React.FocusEvent<HTMLInputElement>) {
    setIsFocused(false);

    onBlur && onBlur(event);
  }

  return (
    <label
      className={`form-field-container ${
        isFocused ? "form-field-container--focused" : ""
      }`.trim()}
    >
      {label}
      <input
        onFocus={focusHandler}
        onBlur={blurHandler}
        className={className}
        {...props}
      />
    </label>
  );
}
