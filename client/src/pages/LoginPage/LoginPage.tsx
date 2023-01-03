import { Link } from "react-router-dom";
import { Login } from "./components";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div className="login-page">
      <Link to="/">
        <img src="/logo.svg" alt="Logo" width={42} height={42} />
      </Link>
      <Login />
    </div>
  );
}
