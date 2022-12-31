export default function isValidPassword(password: string) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  return regex.test(password);
}
