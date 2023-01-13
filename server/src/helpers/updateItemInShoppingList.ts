import { ItemsList, ShoppingList } from "../models";

interface ItemInfo {
  category: string;
  name: string;
  amount: number;
  completed: boolean;
}

export default function updateItemInShoppingList(
  shoppingList: ShoppingList,
  itemsList: ItemsList,
  { category, name, amount, completed }: ItemInfo
) {
  if (!itemIsInItemsList()) {
    return false;
  }

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

    return true;
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

    return true;
  }

  shoppingList[categoryIndex].items[itemIndex].amount = amount;

  return true;

  function itemIsInItemsList() {
    const categoryIndex = itemsList.findIndex(
      element =>
        element.category.toLowerCase() === category.toLowerCase().trim()
    );

    if (categoryIndex === -1) {
      return false;
    }

    return itemsList[categoryIndex].items.some(
      element =>
        element.name.toLocaleLowerCase() === name.toLocaleLowerCase().trim()
    );
  }
}
