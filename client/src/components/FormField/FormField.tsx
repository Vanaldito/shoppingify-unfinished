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
  ...props
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  className = `form-field ${isFocused ? "form-field--focused" : ""} ${
    className ?? ""
  }`.trim();

  return (
    <label
      className={`form-field-container ${
        isFocused ? "form-field-container--focused" : ""
      }`.trim()}
    >
      {label}
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={className}
        {...props}
      />
    </label>
  );
}
