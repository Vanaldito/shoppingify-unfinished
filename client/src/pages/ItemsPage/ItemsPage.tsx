import { useEffect, useState } from "react";
import { Navbar, ProtectedRoute } from "../../components";
import { useFetchAndLoad } from "../../hooks";
import { ItemsList } from "../../models";
import { getItemsList } from "../../services";
import { AddNewItem, ItemInfo, Items, ShoppingList } from "./components";
import "./ItemsPage.css";

interface ItemData {
  category: string;
  name: string;
  image?: string;
  note?: string;
}

type asideBarComponent = "AddNewItem" | "ItemInfo" | "ShoppingList";

export default function ItemsPage() {
  const [asideBarComponent, setAsideBarComponent] =
    useState<asideBarComponent>("ShoppingList");
  const [displayAsideBar, setDisplayAsideBar] = useState(false);
  const [itemInfo, setItemInfo] = useState<ItemData | null>(null);
  const [itemsList, setItemsList] = useState<null | ItemsList>(null);

  const { callEndpoint: callGetItemsListEndpoint, loading: loadingItemsList } =
    useFetchAndLoad();

  function loadItemsList() {
    callGetItemsListEndpoint(getItemsList())
      .then(res => {
        if (res.data) {
          setItemsList(res.data.itemsList);
        }
        if (res.error) {
          console.error(res.error);
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
          {loadingItemsList ? (
            "Loading..."
          ) : (
            <Items
              itemsList={itemsList ?? []}
              selectItem={itemData => {
                setDisplayAsideBar(true);
                setAsideBarComponent("ItemInfo");
                setItemInfo(itemData);
              }}
            />
          )}
        </main>
        <aside
          className={`items-page__aside ${
            displayAsideBar ? "items-page__aside--displayed" : ""
          }`.trim()}
        >
          {asideBarComponent === "ShoppingList" && (
            <ShoppingList
              addItemHandler={() => setAsideBarComponent("AddNewItem")}
            />
          )}
          {asideBarComponent === "AddNewItem" && (
            <AddNewItem
              itemsList={itemsList}
              reloadItemsList={loadItemsList}
              cancel={() => setAsideBarComponent("ShoppingList")}
            />
          )}
          {asideBarComponent === "ItemInfo" && itemInfo && (
            <ItemInfo
              category={itemInfo.category}
              name={itemInfo.name}
              image={itemInfo.image}
              note={itemInfo.note}
              getBack={() => setAsideBarComponent("ShoppingList")}
            />
          )}
        </aside>
      </div>
    </ProtectedRoute>
  );
}
