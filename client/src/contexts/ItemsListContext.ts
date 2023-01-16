import { createContext } from "react";

import { ItemsList } from "../models";

interface ItemsListContextValue {
  itemsList: null | ItemsList;
  changeItemsList: (newItemsList: ItemsList) => void;
  loading: boolean;
  requestItemsList: () => void;
}

const ItemsListContext = createContext<ItemsListContextValue>({
  itemsList: null,
  changeItemsList: () => undefined,
  loading: false,
  requestItemsList: () => undefined,
});

export default ItemsListContext;
