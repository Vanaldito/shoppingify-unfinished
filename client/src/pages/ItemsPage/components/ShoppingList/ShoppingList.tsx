import { useState } from "react";
import { Button } from "../../../../components";
import { useShoppingList } from "../../../../hooks";
import "./ShoppingList.css";
import ShoppingListItem from "./ShoppingListItem";

interface ShoppingListProps {
  addItemHandler: () => void;
}

export default function ShoppingList({ addItemHandler }: ShoppingListProps) {
  const { shoppingList, loading } = useShoppingList();
  const [mode, setMode] = useState<"edit" | "complete">("complete");

  function toggleMode() {
    const newMode: { edit: "complete"; complete: "edit" } = {
      edit: "complete",
      complete: "edit",
    };

    setMode(newMode[mode]);
  }

  return (
    <div className="shopping-list">
      <div className="shopping-list__top">
        <div className="shopping-list__add-new-item">
          <img
            className="shopping-list__add-new-item__image"
            src="/bottle.svg"
            alt=""
            width={81}
            height={135}
          />
          <p>Didn&apos;t find what you need?</p>
          <Button variant="secondary" onClick={addItemHandler}>
            Add Item
          </Button>
        </div>
        {loading && "Loading..."}
        {!loading && (shoppingList ?? []).length > 0 && (
          <div>
            <header className="shopping-list__header">
              <h2 className="shopping-list__title">Shopping List</h2>
              <button
                className="shopping-list__toggle-mode"
                onClick={toggleMode}
              >
                <img src="/icons/edit.svg" />
              </button>
            </header>
            {shoppingList?.map(({ category, items }) => (
              <section key={category} className="shopping-list__section">
                <h3 className="shopping-list__category">{category}</h3>
                <ul className="shopping-list__items">
                  {items.map(item => (
                    <li key={item.name}>
                      <ShoppingListItem
                        category={category}
                        name={item.name}
                        amount={item.amount}
                        completed={item.completed}
                        mode={mode}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
        {!loading && (shoppingList ?? []).length === 0 && (
          <div className="shopping-list__is-empty">
            <p className="shopping-list__is-empty__text">No items</p>
            <img
              className="shopping-list__is-empty__image"
              src="/empty-list.svg"
              alt=""
            />
          </div>
        )}
      </div>
      <div className="shopping-list__buttons">
        {mode === "complete" && (
          <>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Complete</Button>
          </>
        )}
        {mode === "edit" && <Button variant="primary">Save</Button>}
      </div>
    </div>
  );
}
