export type ShoppingList = {
  category: string;
  items: ShoppingListItems[];
}[];

interface ShoppingListItems {
  name: string;
  amount: number;
}
