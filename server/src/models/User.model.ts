import { queryCallback } from "mysql";
import db from "./database.model";

interface UserData {
  email: string;
  password: string;
  itemsList: { category: string; items: string[] }[];
  shoppingCart: string[];
}

export default class User {
  email: string;
  password: string;
  itemsList: { category: string; items: string[] }[];
  shoppingCart: string[];

  constructor({ email, password, itemsList, shoppingCart }: UserData) {
    this.email = email;
    this.password = password;
    this.itemsList = itemsList;
    this.shoppingCart = shoppingCart;
  }

  save(callback?: queryCallback) {
    db.query(
      "INSERT INTO Users (Email, Password, ItemsList, ShoppingCart) VALUES (?, ?, ?, ?)",
      [
        this.email,
        this.password,
        JSON.stringify(this.itemsList),
        JSON.stringify(this.shoppingCart),
      ],
      callback
    );
  }

  static findByEmail(email: string, callback?: queryCallback) {
    db.query("SELECT * FROM Users WHERE Email = ?", [email], callback);
  }
}
