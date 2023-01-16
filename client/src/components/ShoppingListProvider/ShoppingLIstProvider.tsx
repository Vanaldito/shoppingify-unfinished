import { useEffect, useState } from "react";
import { ShoppingListContext } from "../../contexts";
import { useAuth, useFetchAndLoad } from "../../hooks";
import { ShoppingList } from "../../models";
import { getShoppingList } from "../../services";

interface ShoppingListProviderProps {
  children: React.ReactNode;
}

export default function ShoppingListProvider({
  children,
}: ShoppingListProviderProps) {
  const [shoppingList, setShoppingList] = useState<null | ShoppingList>(null);
  const { isLogged } = useAuth();

  const { loading, callEndpoint } = useFetchAndLoad();

  useEffect(() => {
    if (!isLogged) return;
    requestShoppingList();
  }, [isLogged]);

  function requestShoppingList() {
    callEndpoint(getShoppingList())
      .then(res => {
        if (res.data) {
          setShoppingList(res.data.shoppingList);
        }
        if (res.error) {
          console.error(res.error);
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingList,
        changeShoppingList: setShoppingList,
        loading,
        requestShoppingList,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}
