import { Button } from "../../../../components";
import { ShoppingList as ShoppingListType } from "../../../../models";
import "./ShoppingList.css";
import ShoppingListItem from "./ShoppingListItem";

interface ShoppingListProps {
  shoppingList: ShoppingListType;
  loading: boolean;
  addItemHandler: () => void;
}

export default function ShoppingList({
  shoppingList,
  loading,
  addItemHandler,
}: ShoppingListProps) {
  return (
    <div className="shopping-list">
      <div className="shopping-list__top">
        <header className="shopping-list__header">
          <img
            className="shopping-list__header__image"
            src="/bottle.svg"
            alt=""
            width={81}
            height={135}
          />
          <p>Didn&apos;t find what you need?</p>
          <Button variant="secondary" onClick={addItemHandler}>
            Add Item
          </Button>
        </header>
        {loading && "Loading..."}
        {!loading && shoppingList.length > 0 && (
          <div>
            <h2 className="shopping-list__title">Shopping List</h2>
            {shoppingList.map(({ category, items }) => (
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
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
        {!loading && shoppingList.length === 0 && (
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
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Complete</Button>
      </div>
    </div>
  );
}
