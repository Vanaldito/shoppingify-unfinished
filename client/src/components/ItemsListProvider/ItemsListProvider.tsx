import { useEffect, useState } from "react";
import { ItemsListContext } from "../../contexts";
import { useAuth, useFetchAndLoad } from "../../hooks";
import { ItemsList } from "../../models";
import { getItemsList } from "../../services";

interface ItemsListProviderProps {
  children: React.ReactNode;
}

export default function ItemsListProvider({
  children,
}: ItemsListProviderProps) {
  const [itemsList, setItemsList] = useState<null | ItemsList>(null);

  const { isLogged } = useAuth();

  const { loading, callEndpoint } = useFetchAndLoad();

  function requestItemsList() {
    if (loading) return;

    callEndpoint(getItemsList())
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

  useEffect(() => {
    if (!isLogged) return;
    requestItemsList();
  }, [isLogged]);

  return (
    <ItemsListContext.Provider
      value={{
        itemsList,
        changeItemsList: setItemsList,
        loading,
        requestItemsList,
      }}
    >
      {children}
    </ItemsListContext.Provider>
  );
}
