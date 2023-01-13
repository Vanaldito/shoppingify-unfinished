interface ShoppingLIstItemProps {
  name: string;
  amount: number;
  completed: boolean;
}

export default function ShoppingListItem({
  name,
  amount,
  completed,
}: ShoppingLIstItemProps) {
  return (
    <div className="shopping-list__item">
      <div className="shopping-list__item__left">
        <button className="shopping-list__item__checkbox">
          {completed && <img src="/public/icons/completed.svg" />}
        </button>
        <span
          className={`shopping-list__item__name ${
            completed ? "shopping-list__item__name--checked" : ""
          }`.trim()}
        >
          {name}
        </span>
      </div>
      <span className="shopping-list__item__amount">{amount} pcs</span>
    </div>
  );
}
