import { ShoppingListList } from "../models";

interface ItemInfo {
  category: string;
  name: string;
  amount: number;
  completed: boolean;
}

export default function updateItemInShoppingList(
  shoppingList: ShoppingListList,
  { category, name, amount, completed }: ItemInfo
) {
  const categoryIndex = shoppingList.findIndex(
    element => element.category.toLowerCase() === category.toLowerCase().trim()
  );

  if (categoryIndex === -1) {
    shoppingList.push({
      category: category.trim(),
      items: [
        {
          name: name.trim(),
          amount,
          completed,
        },
      ],
    });

    return;
  }

  const itemIndex = shoppingList[categoryIndex].items.findIndex(
    element => element.name.toLowerCase() === name.toLowerCase().trim()
  );

  if (itemIndex === -1) {
    shoppingList[categoryIndex].items.push({
      name: name.trim(),
      amount,
      completed,
    });

    return;
  }

  shoppingList[categoryIndex].items[itemIndex].amount = amount;
  shoppingList[categoryIndex].items[itemIndex].completed = completed;
}
