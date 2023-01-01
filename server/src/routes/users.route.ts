import bcrypt from "bcrypt";
import { Router } from "express";
import { isValidEmail, isValidPassword } from "../helpers";
import { User } from "../models";

const usersRouter = Router();

usersRouter.post("/register", async (req, res) => {
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

  const saltRounds = 10;
  let hashedPassword: string;
  try {
    hashedPassword = await bcrypt.hash(password.trim(), saltRounds);
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ status: 500, error: "Internal server error" });
  }

  new User({ email: email.trim(), password: hashedPassword }).save(err => {
    if (!err) return res.json({ status: 200 });

    if (err.errno === 1062)
      return res
        .status(400)
        .json({ status: 400, error: "Email is already used" });

    console.log(err);

    return res
      .status(500)
      .json({ status: 500, error: "Internal server error" });
  });
});

export default usersRouter;
