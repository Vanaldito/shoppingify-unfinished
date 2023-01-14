import { useEffect, useState } from "react";
import { useFetchAndLoad } from "../../../../hooks";
import { updateItemInShoppingList } from "../../../../services";

interface ShoppingLIstItemProps {
  category: string;
  name: string;
  amount: number;
  completed: boolean;
}

export default function ShoppingListItem({
  category,
  name,
  amount,
  completed,
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

  return (
    <div className="shopping-list__item">
      <div className="shopping-list__item__left">
        <button className="shopping-list__item__checkbox" onClick={toggleCheck}>
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
