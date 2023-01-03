import FormField from "./FormField";

interface PasswordFieldProps {
  password: string;
  changePassword: React.ChangeEventHandler<HTMLInputElement>;
}

export default function PasswordField({
  password,
  changePassword,
}: PasswordFieldProps) {
  return (
    <FormField
      required={true}
      type="password"
      placeholder="Password"
      value={password}
      onChange={changePassword}
      pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
    />
  );
}
