import {
  deleteItemFromList as deleteItemFromClientShoppingList,
  updateItemInShoppingList as updateItemInClientShoppingList,
} from "../../../../helpers";
import { useFetchAndLoad, useShoppingList } from "../../../../hooks";
import {
  deleteItemFromShoppingList,
  updateItemInShoppingList,
} from "../../../../services";

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
  const { shoppingList, changeShoppingList } = useShoppingList();

  const { loading, callEndpoint } = useFetchAndLoad();

  function toggleCheck() {
    if (!shoppingList) return;
    if (loading) return;

    callEndpoint(
      updateItemInShoppingList({
        category,
        name,
        amount,
        completed: !completed,
      })
    )
      .then(res => {
        if (res.error) {
          console.error(res.error);
        } else {
          const newShoppingList = [...shoppingList.list];
          updateItemInClientShoppingList(newShoppingList, {
            category,
            name,
            amount,
            completed: !completed,
          });
          changeShoppingList({
            name: shoppingList.name,
            list: newShoppingList,
          });
        }
      })
      .catch(err => console.error(err));
  }

  function increaseAmount() {
    if (loading) return;
    if (!shoppingList) return;

    callEndpoint(
      updateItemInShoppingList({
        category,
        name,
        amount: amount + 1,
        completed,
      })
    ).then(res => {
      if (res.error) {
        console.error(res.error);
      } else {
        const newShoppingList = [...shoppingList.list];
        updateItemInClientShoppingList(newShoppingList, {
          category,
          name,
          amount: amount + 1,
          completed,
        });
        changeShoppingList({ name: shoppingList.name, list: newShoppingList });
      }
    });
  }

  function decreaseAmount() {
    if (loading) return;
    if (!shoppingList) return;

    if (amount < 2) return;

    callEndpoint(
      updateItemInShoppingList({
        category,
        name,
        amount: amount - 1,
        completed,
      })
    ).then(res => {
      if (res.error) {
        console.error(res.error);
      } else {
        const newShoppingList = [...shoppingList.list];
        updateItemInClientShoppingList(newShoppingList, {
          category,
          name,
          amount: amount - 1,
          completed,
        });
        changeShoppingList({ name: shoppingList.name, list: newShoppingList });
      }
    });
  }

  function deleteItem() {
    if (!shoppingList) return;
    if (loading) return;

    callEndpoint(deleteItemFromShoppingList({ category, name })).then(res => {
      if (res.error) {
        console.error(res.error);
      } else {
        const newShoppingList = [...shoppingList.list];
        deleteItemFromClientShoppingList(newShoppingList, { category, name });
        changeShoppingList({ name: shoppingList.name, list: newShoppingList });
      }
    });
  }

  if (mode === "complete") {
    return (
      <div className="shopping-list__item">
        <div className="shopping-list__item__left">
          <button
            className="shopping-list__item__checkbox"
            onClick={toggleCheck}
          >
            {completed && <img src="/icons/completed.svg" />}
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

  return (
    <div className="shopping-list__item">
      <div className="shopping-list__item__left">
        <span className="shopping-list__item__name">{name}</span>
      </div>
      <div className="shopping-list__edit-item">
        <button
          className="shopping-list__edit-item__delete-button"
          onClick={deleteItem}
        >
          <img src="/icons/delete.svg" alt="" />
        </button>
        <button
          onClick={decreaseAmount}
          className="shopping-list__edit-item__decrease-button"
        >
          &minus;
        </button>
        <span className="shopping-list__item__amount">{amount} pcs</span>
        <button
          onClick={increaseAmount}
          className="shopping-list__edit-item__increase-button"
        >
          +
        </button>
      </div>
    </div>
  );
}
