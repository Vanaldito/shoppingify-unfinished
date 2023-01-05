import { useEffect, useState } from "react";
import { Navbar, ProtectedRoute } from "../../components";
import { useFetchAndLoad } from "../../hooks";
import { ItemsList } from "../../models";
import { getItemsList } from "../../services";
import { Item } from "./components";
import "./ItemsPage.css";

export default function ItemsPage() {
  const [itemsList, setItemsList] = useState<null | ItemsList>(null);

  const { callEndpoint, loading } = useFetchAndLoad();

  useEffect(() => {
    callEndpoint(getItemsList())
      .then(res => {
        if (res.data) {
          setItemsList(res.data.itemsList);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <ProtectedRoute>
      <div className="home-page">
        <Navbar />
        <main className="home-page__main">
          <h1 className="home-page__title">
            <span className="yellow-text">Shoppingify</span> allows you take
            your shopping list wherever you go
          </h1>
          {loading ? (
            "Loading..."
          ) : (
            <>
              {itemsList?.map(({ category, items }) => (
                <section className="home-page__items-section" key={category}>
                  <h2 className="home-page__items-category">{category}</h2>
                  <ul className="home-page__items-list">
                    {items.map(item => (
                      <li className="home-page__items-list__item" key={item}>
                        <Item itemName={item} />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
