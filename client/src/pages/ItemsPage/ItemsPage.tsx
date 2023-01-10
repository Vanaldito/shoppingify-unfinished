import { useEffect, useState } from "react";
import { Navbar, ProtectedRoute } from "../../components";
import { useFetchAndLoad } from "../../hooks";
import { ItemsList } from "../../models";
import { getItemsList } from "../../services";
import { AddNewItem, Item, ItemInfo } from "./components";
import "./ItemsPage.css";

interface ItemData {
  category: string;
  name: string;
  image?: string;
  note?: string;
}

export default function ItemsPage() {
  const [displayAsideBar, setDisplayAsideBar] = useState(false);
  const [itemInfo, setItemInfo] = useState<ItemData | null>(null);
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
      <div
        className={`items-page ${
          displayAsideBar ? "items-page--aside-bar-displayed" : ""
        }`.trim()}
      >
        <Navbar toggleAsideBar={() => setDisplayAsideBar(!displayAsideBar)} />
        <main
          className={`items-page__main ${
            displayAsideBar ? "items-page__main--aside-bar-displayed" : ""
          }`.trim()}
        >
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
                      <li
                        className="items-page__items-list__item"
                        key={item.name}
                      >
                        <Item
                          selectItem={() => {
                            setItemInfo({ category, ...item });
                            setDisplayAsideBar(true);
                          }}
                          itemName={item.name}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </>
          )}
        </main>
        <aside
          className={`items-page__aside ${
            displayAsideBar ? "items-page__aside--displayed" : ""
          }`.trim()}
        >
          {itemInfo ? (
            <ItemInfo
              category={itemInfo.category}
              name={itemInfo.name}
              image={itemInfo.image}
              note={itemInfo.note}
            />
          ) : (
            <AddNewItem itemsList={itemsList} reloadItemsList={loadItemsList} />
          )}
        </aside>
      </div>
    </ProtectedRoute>
  );
}
