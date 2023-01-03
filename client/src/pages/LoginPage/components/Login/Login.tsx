import { useState } from "react";
import { Link } from "react-router-dom";
import { EmailField, PasswordField } from "../../../../components";

import "./Login.css";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function changeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="login">
      <h2 className="login__title">Login</h2>
      <form className="login__form" onSubmit={submitHandler}>
        <div className="login__fields">
          <EmailField email={email} changeEmail={changeEmail} />
          <PasswordField password={password} changePassword={changePassword} />
        </div>
        <button className="login__submit-button" type="submit">
          Login
        </button>
      </form>
      <div className="login__not-account-yet">
        Don&apos;t have an account yet?{" "}
        <Link className="login__sign-up-link" to="/sign-up">
          Register
        </Link>
      </div>
    </div>
  );
}
