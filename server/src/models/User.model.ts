import { queryCallback } from "mysql";
import db from "./database.model";

interface UserData {
  email: string;
  password: string;
}

export default class User {
  email: string;
  password: string;

  constructor({ email, password }: UserData) {
    this.email = email;
    this.password = password;
  }

  save(callback?: queryCallback) {
    db.query(
      "INSERT INTO Users (Email, Password) VALUES (?, ?)",
      [this.email, this.password],
      callback
    );
  }
}
