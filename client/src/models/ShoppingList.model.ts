export type ShoppingList = {
  category: string;
  items: ShoppingListItem[];
}[];

interface ShoppingListItem {
  name: string;
  amount: number;
  completed: boolean;
}
