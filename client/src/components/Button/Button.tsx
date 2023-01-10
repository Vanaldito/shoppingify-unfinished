import "./Button.css";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: "primary" | "secondary";
}

export default function Button({
  variant,
  className,
  children,
  ...props
}: ButtonProps) {
  className = `button button--${variant} ${className ?? ""}`.trim();

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
