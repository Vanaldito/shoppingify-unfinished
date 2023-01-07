import { useState } from "react";
import { FormError, Logo } from "../../components";
import { Login } from "./components";
import "./LoginPage.css";

export default function LoginPage() {
  const [error, setError] = useState("");

  return (
    <div className="login-page">
      {error && <FormError error={error} clearError={() => setError("")} />}
      <div className="login-page__form">
        <Logo />
        <Login setError={setError} />
      </div>
    </div>
  );
}
