import "./Item.css";

interface ItemProps {
  selectItem: () => void;
  itemName: string;
}

export default function Item({ selectItem, itemName }: ItemProps) {
  return (
    <button className="home-page__item" onClick={selectItem} type="button">
      {itemName}
      <span className="home-page__item__add-icon">+</span>
    </button>
  );
}
