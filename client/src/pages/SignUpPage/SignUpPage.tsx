import { useState } from "react";
import { FormError, Logo } from "../../components";
import { SignUp } from "./components";

import "./SignUpPage.css";

export default function SignUpPage() {
  const [error, setError] = useState("");

  return (
    <div className="sign-up-page">
      {error && <FormError error={error} clearError={() => setError("")} />}
      <div className="sign-up-page__form">
        <Logo />
        <SignUp setError={setError} />
      </div>
    </div>
  );
}
