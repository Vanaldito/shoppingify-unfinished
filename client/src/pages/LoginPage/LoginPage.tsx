import { Logo } from "../../components";
import { Login } from "./components";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div className="login-page">
      <Logo />
      <Login />
    </div>
  );
}
