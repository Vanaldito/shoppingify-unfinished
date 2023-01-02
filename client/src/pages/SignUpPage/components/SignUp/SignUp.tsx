import { useState } from "react";
import { Link } from "react-router-dom";

import "./SignUp.css";

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
    <div className="sign-up">
      <h2 className="sign-up__title">
        Join thousands of learners from around the world
      </h2>
      <p className="sign-up__description">
        Master web development by making real-life projects. There are multiple
        paths for you to choose
      </p>
      <form className="sign-up__form" onSubmit={submitHandler}>
        <div className="sign-up__fields">
          <input
            className="sign-up__field"
            required={true}
            type="email"
            placeholder="Email"
            value={email}
            onChange={changeEmail}
          />
          <input
            className="sign-up__field"
            required={true}
            type="password"
            placeholder="Password"
            value={password}
            onChange={changePassword}
            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
          />
        </div>
        <button className="sign-up__submit-button" type="submit">
          Start coding now
        </button>
      </form>
      <div className="sign-up__already-a-member">
        Already a member?{" "}
        <Link className="sign-up__login-link" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
