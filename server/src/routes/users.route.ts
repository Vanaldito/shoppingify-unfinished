import bcrypt from "bcrypt";
import { Router } from "express";
import { OkPacket } from "mysql";
import { defaultItemsList } from "../constants";
import { createAuthToken, isValidEmail, isValidPassword } from "../helpers";
import { User, UserData } from "../models";

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

  new User({
    email: email.trim(),
    password: hashedPassword,
    itemsList: defaultItemsList,
    shoppingList: { name: `default--${Date.now()}`, list: [] },
    shoppingHistory: [],
  }).save((err, result) => {
    if (!err) {
      const authToken = createAuthToken((result as OkPacket).insertId);

      return res
        .cookie("auth-token", `Bearer ${authToken}`, {
          expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
          secure: true,
          sameSite: true,
        })
        .json({ status: 200 });
    }

    if (err.errno === 1062)
      return res
        .status(409)
        .json({ status: 409, error: "Email is already used" });

    console.log(err);

    return res
      .status(500)
      .json({ status: 500, error: "Internal server error" });
  });
});

usersRouter.post("/login", (req, res) => {
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

  User.findByEmail(email.trim(), async (err, result: UserData[]) => {
    if (err)
      return res
        .status(500)
        .json({ status: 500, error: "Internal server error" });

    if (result.length === 0)
      return res
        .status(401)
        .json({ status: 401, error: "Email or password incorrect" });

    const userInfo = result[0];

    let isCorrectPassword;
    try {
      isCorrectPassword = await bcrypt.compare(
        password.trim(),
        userInfo.Password
      );
    } catch (err) {
      console.log(err);

      return res
        .status(500)
        .json({ status: 500, error: "Internal server error" });
    }

    if (!isCorrectPassword)
      return res
        .status(401)
        .json({ status: 401, error: "Email or password incorrect" });

    const authToken = createAuthToken(userInfo.Id);

    return res
      .cookie("auth-token", `Bearer ${authToken}`, {
        expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
        secure: true,
        sameSite: true,
      })
      .json({ status: 200 });
  });
});

export default usersRouter;
