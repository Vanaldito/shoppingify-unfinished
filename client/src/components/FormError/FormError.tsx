import "./FormError.css";

interface FormErrorProps {
  error: string;
  clearError: () => void;
}

export default function FormError({ error, clearError }: FormErrorProps) {
  return (
    <div className="form-error">
      {error}
      <button className="form-error__clear-error" onClick={clearError}>
        &times;
      </button>
    </div>
  );
}
