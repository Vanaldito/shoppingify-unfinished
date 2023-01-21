import { queryCallback } from "mysql";
import db from "./database.model";
import { ItemsList } from "./ItemsList.model";
import { ShoppingHistory } from "./ShoppingHistory.model";
import { ShoppingList } from "./ShoppingLIst.model";

interface UserData {
  email: string;
  password: string;
  itemsList: ItemsList;
  shoppingList: ShoppingList;
  shoppingHistory: ShoppingHistory;
}

export default class User {
  email: string;
  password: string;
  itemsList: ItemsList;
  shoppingList: ShoppingList;
  shoppingHistory: ShoppingHistory;

  constructor({
    email,
    password,
    itemsList,
    shoppingList,
    shoppingHistory,
  }: UserData) {
    this.email = email;
    this.password = password;
    this.itemsList = itemsList;
    this.shoppingList = shoppingList;
    this.shoppingHistory = shoppingHistory;
  }

  save(callback?: queryCallback) {
    db.query(
      "INSERT INTO Users (Email, Password, ItemsList, ShoppingList, ShoppingHistory) VALUES (?, ?, ?, ?, ?)",
      [
        this.email,
        this.password,
        JSON.stringify(this.itemsList),
        JSON.stringify(this.shoppingList),
        JSON.stringify(this.shoppingHistory),
      ],
      callback
    );
  }

  static findById(id: number, callback?: queryCallback) {
    db.query("SELECT * FROM Users WHERE Id = ?", [id], callback);
  }

  static findByEmail(email: string, callback?: queryCallback) {
    db.query("SELECT * FROM Users WHERE Email = ?", [email], callback);
  }

  static updateItemsList(
    userId: number,
    itemsList: string,
    callback?: queryCallback
  ) {
    db.query(
      "UPDATE Users SET ItemsList = ? WHERE Id = ?",
      [itemsList, userId],
      callback
    );
  }

  static updateShoppingList(
    userId: number,
    shoppingList: string,
    callback?: queryCallback
  ) {
    db.query(
      "UPDATE Users SET ShoppingList = ? WHERE Id = ?",
      [shoppingList, userId],
      callback
    );
  }
}
