import { useState } from "react";
import { Logo } from "../../components";
import { SignUp } from "./components";

import "./SignUpPage.css";

export default function SignUpPage() {
  const [error, setError] = useState("");

  return (
    <div className="sign-up-page">
      {error && (
        <div className="sign-up-page__error">
          {error}
          <button
            onClick={() => setError("")}
            className="sign-up-page__clear-error"
          >
            &times;
          </button>
        </div>
      )}
      <div className="sign-up-page__form">
        <Logo />
        <SignUp setError={setError} />
      </div>
    </div>
  );
}
