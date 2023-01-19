export interface ShoppingList {
  name: string;
  list: ShoppingListList;
}

export type ShoppingListList = {
  category: string;
  items: ShoppingListItem[];
}[];

interface ShoppingListItem {
  name: string;
  amount: number;
  completed: boolean;
}
