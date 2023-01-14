import { useEffect, useState } from "react";
import { useFetchAndLoad } from "../../../../hooks";
import { updateItemInShoppingList } from "../../../../services";

interface ShoppingLIstItemProps {
  category: string;
  name: string;
  amount: number;
  completed: boolean;
  mode: "edit" | "complete";
}

export default function ShoppingListItem({
  category,
  name,
  amount,
  completed,
  mode,
}: ShoppingLIstItemProps) {
  const [checked, setChecked] = useState(false);

  const { loading, callEndpoint } = useFetchAndLoad();

  useEffect(() => {
    setChecked(completed);
  }, []);

  function toggleCheck() {
    if (loading) return;

    callEndpoint(
      updateItemInShoppingList({
        category,
        name,
        amount,
        completed: !checked,
      })
    )
      .then(res => {
        if (res.error) {
          console.error(res.error);
        } else {
          setChecked(!checked);
        }
      })
      .catch(err => console.error(err));
  }

  if (mode === "complete") {
    return (
      <div className="shopping-list__item">
        <div className="shopping-list__item__left">
          <button
            className="shopping-list__item__checkbox"
            onClick={toggleCheck}
          >
            {checked && <img src="/icons/completed.svg" />}
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

  return (
    <div className="shopping-list__item">
      <div className="shopping-list__item__left">
        <span className="shopping-list__item__name">{name}</span>
      </div>
      <div className="shopping-list__edit-item">
        <button className="shopping-list__edit-item__delete-button">
          <img src="/icons/delete.svg" alt="" />
        </button>
        <button className="shopping-list__edit-item__decrease-button">
          &minus;
        </button>
        <span className="shopping-list__item__amount">{amount} pcs</span>
        <button className="shopping-list__edit-item__increase-button">+</button>
      </div>
    </div>
  );
}
