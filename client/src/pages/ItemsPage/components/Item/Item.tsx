import "./Item.css";

interface ItemProps {
  itemName: string;
}

export default function Item({ itemName }: ItemProps) {
  return (
    <button className="home-page__item">
      {itemName}
      <span className="home-page__item__add-icon">+</span>
    </button>
  );
}
