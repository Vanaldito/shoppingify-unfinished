import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EmailField, PasswordField } from "../../../../components";
import { useFetchAndLoad } from "../../../../hooks";
import { login } from "../../../../services";

import "./Login.css";

interface LoginProps {
  setError: (error: string) => void;
}

export default function Login({ setError }: LoginProps) {
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

    callEndpoint(login({ email: email.trim(), password: password.trim() }))
      .then(res => {
        if (res.error) {
          return setError(res.error);
        }

        navigate("/");
      })
      .catch(err => console.error(err));

    setPassword("");
    setEmail("");
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
          {loading ? "Loading..." : "Login"}
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
