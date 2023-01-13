import { useState } from "react";

interface ShoppingLIstItemProps {
  name: string;
  amount: number;
}

export default function ShoppingListItem({
  name,
  amount,
}: ShoppingLIstItemProps) {
  const [checked, setChecked] = useState(false);

  function toggleCheck() {
    setChecked(!checked);
  }

  return (
    <div className="shopping-list__item">
      <div className="shopping-list__item__left">
        <button className="shopping-list__item__checkbox" onClick={toggleCheck}>
          {checked && "X"}
        </button>
        <span
          className={`shopping-list__item__name ${
            checked ? "shopping-list__item__name--checked" : ""
          }`.trim()}
        >
          {name}
        </span>
      </div>
      <span className="shopping-list__item__amount">{amount} pcs</span>
    </div>
  );
}
