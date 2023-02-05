import { useState } from "react";
import { ItemsListProvider, Navbar, ProtectedRoute } from "../../components";
import { useItemsList } from "../../hooks";
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
  const { loading } = useItemsList();

  return (
    <ProtectedRoute>
      <ItemsListProvider>
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
              <Items
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
            aria-label="aside"
          >
            {asideBarComponent === "ShoppingList" && (
              <ShoppingList
                addItemHandler={() => setAsideBarComponent("AddNewItem")}
              />
            )}
            {asideBarComponent === "AddNewItem" && (
              <AddNewItem cancel={() => setAsideBarComponent("ShoppingList")} />
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
      </ItemsListProvider>
    </ProtectedRoute>
  );
}
