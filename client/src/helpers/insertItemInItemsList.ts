import { ItemsList } from "../models";

interface ItemInfo {
  category: string;
  name: string;
  image?: string;
  note?: string;
}

export default function insertItemInItemsList(
  itemsList: ItemsList,
  { category, name, image, note }: ItemInfo
) {
  const categoryIndex = itemsList.findIndex(
    element => element.category.toLowerCase() === category.toLowerCase().trim()
  );

  if (categoryIndex === -1) {
    return itemsList.push({
      category: category.trim(),
      items: [
        {
          name: name.trim(),
          image: image?.trim(),
          note: note?.trim(),
        },
      ],
    });
  }

  const itemIndex = itemsList[categoryIndex].items.findIndex(
    item => item.name.toLowerCase() === name.toLowerCase().trim()
  );

  if (itemIndex !== -1) {
    return;
  }

  itemsList[categoryIndex].items.push({
    name: name.trim(),
    image: image?.trim(),
    note: note?.trim(),
  });
}
