import { useState } from "react";
import { Logo } from "../../components";
import { Login } from "./components";
import "./LoginPage.css";

export default function LoginPage() {
  const [error, setError] = useState("");

  return (
    <div className="login-page">
      {error && (
        <div className="login-page__error">
          {error}
          <button
            className="login-page__clear-error"
            onClick={() => setError("")}
          >
            &times;
          </button>
        </div>
      )}
      <div className="login-page__form">
        <Logo />
        <Login setError={setError} />
      </div>
    </div>
  );
}
