import "./FormField.css";

export default function FormField({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  className = `form-field ${className ?? ""}`.trim();

  return <input className={className} {...props} />;
}
