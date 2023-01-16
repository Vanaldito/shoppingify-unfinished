import { useContext } from "react";
import { ShoppingListContext } from "../contexts";

export default function useShoppingList() {
  return useContext(ShoppingListContext);
}
