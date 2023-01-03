import FormField from "./FormField";

interface EmailFieldProps {
  email: string;
  changeEmail: React.ChangeEventHandler<HTMLInputElement>;
}

export default function EmailField({ email, changeEmail }: EmailFieldProps) {
  return (
    <FormField
      required={true}
      type="email"
      placeholder="Email"
      value={email}
      onChange={changeEmail}
    />
  );
}
