import { useContext } from "react";
import { ItemsListContext } from "../contexts";

export default function useItemsList() {
  return useContext(ItemsListContext);
}
