import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="logo">
      <img src="/logo.svg" alt="Shoppingify Logo" width={42} height={42} />
    </Link>
  );
}
