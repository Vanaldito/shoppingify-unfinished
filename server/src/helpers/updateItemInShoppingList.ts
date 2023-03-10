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

  const list = shoppingList.list;

  const categoryIndex = list.findIndex(
    element => element.category.toLowerCase() === category.toLowerCase().trim()
  );

  if (categoryIndex === -1) {
    list.push({
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

  const itemIndex = list[categoryIndex].items.findIndex(
    element => element.name.toLowerCase() === name.toLowerCase().trim()
  );

  if (itemIndex === -1) {
    list[categoryIndex].items.push({
      name: name.trim(),
      amount,
      completed,
    });

    return true;
  }

  list[categoryIndex].items[itemIndex].amount = amount;
  list[categoryIndex].items[itemIndex].completed = completed;

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
