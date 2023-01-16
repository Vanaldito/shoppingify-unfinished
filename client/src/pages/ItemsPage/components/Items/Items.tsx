import { useItemsList } from "../../../../hooks";
import { Item } from "../Item";
import "./Items.css";

interface ItemData {
  category: string;
  name: string;
  image?: string;
  note?: string;
}

interface ItemsProps {
  selectItem: (itemData: ItemData) => void;
}

export default function Items({ selectItem }: ItemsProps) {
  const { itemsList } = useItemsList();

  return (
    <>
      {(itemsList ?? []).map(({ category, items }) => (
        <section key={category}>
          <h2 className="items-page__items-category">{category}</h2>
          <ul className="items-page__items-list">
            {items.map(item => (
              <li key={item.name}>
                <Item
                  selectItem={() => selectItem({ category, ...item })}
                  itemName={item.name}
                />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
