import { Router } from "express";
import { isValidEmail, isValidPassword } from "../helpers";

const usersRouter = Router();

const miniDB: { email: string; password: string }[] = [];

usersRouter.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (
    typeof email !== "string" ||
    !email.trim() ||
    !isValidEmail(email.trim())
  ) {
    return res.status(400).json({ error: "Please enter a valid email" });
  }

  if (
    typeof password !== "string" ||
    !password.trim() ||
    !isValidPassword(password.trim())
  ) {
    return res
      .status(400)
      .json({ status: 400, error: "Please enter a valid password" });
  }

  if (miniDB.some(({ email: existingEmail }) => email === existingEmail)) {
    return res
      .status(400)
      .json({ status: 400, error: "Email is already used" });
  }

  miniDB.push({ email: email.trim(), password: password.trim() });

  console.log(miniDB);

  res.json({ status: 200 });
});

export default usersRouter;
