import { ShoppingList } from "./ShoppingList.model";

export type ShoppingHistory = ({
  state: "cancelled" | "completed";
} & ShoppingList)[];
