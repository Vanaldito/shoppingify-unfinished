import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetchAndLoad } from "../../../../hooks";
import { registerUser } from "../../../../services";

import "./SignUp.css";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { loading, callEndpoint } = useFetchAndLoad();

  const navigate = useNavigate();

  function changeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);

    if (event.target.value.trim() === "") {
      return event.target.setCustomValidity("Please fill out this field");
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(event.target.value.trim())
    ) {
      return event.target.setCustomValidity(
        "Password must contain at least 8 characters, including UPPER/lowercase and numbers"
      );
    }

    event.target.setCustomValidity("");
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    if (password.trim() === "" || email.trim() === "") return;
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.trim())) return;
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password.trim())) return;

    callEndpoint(
      registerUser({ email: email.trim(), password: password.trim() })
    )
      .then(res => {
        if (res.error) {
          return console.error(res.error);
        }

        navigate("/");
      })
      .catch(err => console.error(err));

    setPassword("");
    setEmail("");
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
          {loading ? "Loading..." : "Start coding now"}
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
