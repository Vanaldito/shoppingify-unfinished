import { useEffect, useState } from "react";
import { Navbar, ProtectedRoute } from "../../components";
import { useFetchAndLoad } from "../../hooks";
import { ItemsList } from "../../models";
import { getItemsList } from "../../services";
import { AddNewItem, Item } from "./components";
import "./ItemsPage.css";

export default function ItemsPage() {
  const [itemsList, setItemsList] = useState<null | ItemsList>(null);

  const { callEndpoint, loading } = useFetchAndLoad();

  function loadItemsList() {
    callEndpoint(getItemsList())
      .then(res => {
        if (res.data) {
          setItemsList(res.data.itemsList);
        }
      })
      .catch(err => console.error(err));
  }

  useEffect(loadItemsList, []);

  return (
    <ProtectedRoute>
      <div className="items-page">
        <Navbar />
        <main className="items-page__main">
          <h1 className="items-page__title">
            <span className="yellow-text">Shoppingify</span> allows you take
            your shopping list wherever you go
          </h1>
          {loading ? (
            "Loading..."
          ) : (
            <>
              {itemsList?.map(({ category, items }) => (
                <section className="items-page__items-section" key={category}>
                  <h2 className="items-page__items-category">{category}</h2>
                  <ul className="items-page__items-list">
                    {items.map(item => (
                      <li className="items-page__items-list__item" key={item}>
                        <Item itemName={item} />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </>
          )}
        </main>
        <aside className="items-page__aside">
          <AddNewItem itemsList={itemsList} reloadItemsList={loadItemsList} />
        </aside>
      </div>
    </ProtectedRoute>
  );
}
