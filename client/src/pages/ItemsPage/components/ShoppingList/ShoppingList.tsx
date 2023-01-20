import React, { useEffect, useState } from "react";
import { Button, FormField } from "../../../../components";
import { useFetchAndLoad, useShoppingList } from "../../../../hooks";
import { changeShoppingListName } from "../../../../services";
import "./ShoppingList.css";
import ShoppingListItem from "./ShoppingListItem";

interface ShoppingListProps {
  addItemHandler: () => void;
}

export default function ShoppingList({ addItemHandler }: ShoppingListProps) {
  const { shoppingList, loading, changeShoppingList } = useShoppingList();
  const [mode, setMode] = useState<"edit" | "complete">("complete");
  const [listName, setListName] = useState("");

  const { loading: loadingName, callEndpoint } = useFetchAndLoad();

  useEffect(() => {
    if (!shoppingList) return;

    setListName(shoppingList.name);
  }, [shoppingList, mode]);

  function toggleMode() {
    const newMode: { edit: "complete"; complete: "edit" } = {
      edit: "complete",
      complete: "edit",
    };

    setMode(newMode[mode]);
  }

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setListName(event.target.value);
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loadingName) return;
    if (!shoppingList) return;
    if (!listName.trim()) return;

    callEndpoint(changeShoppingListName(listName)).then(res => {
      if (res.error) {
        console.error(res.error);
      } else {
        changeShoppingList({ name: listName.trim(), list: shoppingList.list });
      }
    });
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
        {!loading &&
          (shoppingList ?? { name: "", list: [] }).list.length > 0 && (
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
              {shoppingList?.list.map(({ category, items }) => (
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
        {!loading &&
          (shoppingList ?? { name: "", list: [] }).list.length === 0 && (
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
      {mode === "complete" && (
        <div className="shopping-list__buttons">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Complete</Button>
        </div>
      )}
      {mode === "edit" && (
        <form className="shopping-list__name-form" onSubmit={submitHandler}>
          <FormField
            value={listName}
            onChange={changeHandler}
            placeholder="Enter a name"
          />
          <Button type="submit" variant="primary">
            {loadingName ? "Loading..." : "Save"}
          </Button>
        </form>
      )}
    </div>
  );
}
