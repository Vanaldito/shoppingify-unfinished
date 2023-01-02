import { Link } from "react-router-dom";
import { SignUp } from "./components";

import "./SignUpPage.css";

export default function SignUpPage() {
  return (
    <div className="sign-up-page">
      <Link to="/">
        <img src="/logo.svg" alt="Logo" width={42} height={42} />
      </Link>
      <SignUp />
    </div>
  );
}
