import { ShoppingList } from "./ShoppingLIst.model";

export type ShoppingHistory = ({
  state: "completed" | "cancelled";
} & ShoppingList)[];
