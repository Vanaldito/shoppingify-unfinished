import { Button } from "../../../../components";
import {
  deleteItemFromList,
  updateItemInShoppingList as updateItemInClientShoppingList,
} from "../../../../helpers";
import {
  useFetchAndLoad,
  useItemsList,
  useShoppingList,
} from "../../../../hooks";
import {
  deleteItemFromItemsList,
  updateItemInShoppingList,
} from "../../../../services";
import "./ItemInfo.css";

interface ItemInfoProps {
  name: string;
  category: string;
  image?: string;
  note?: string;
  getBack: () => void;
}

export default function ItemInfo({
  name,
  category,
  image,
  note,
  getBack,
}: ItemInfoProps) {
  const { shoppingList, changeShoppingList } = useShoppingList();
  const { itemsList, changeItemsList } = useItemsList();
  const { loading, callEndpoint } = useFetchAndLoad();

  function addToList() {
    if (!shoppingList) return;
    if (loading) return;

    callEndpoint(
      updateItemInShoppingList({ category, name, amount: 1, completed: false })
    ).then(res => {
      if (res.error) {
        console.error(res.error);
      } else {
        const newShoppingList = [...shoppingList];
        updateItemInClientShoppingList(newShoppingList, {
          category,
          name,
          amount: 1,
          completed: false,
        });
        changeShoppingList(newShoppingList);
        getBack();
      }
    });
  }

  function deleteItem() {
    if (!shoppingList) return;
    if (!itemsList) return;
    if (loading) return;

    callEndpoint(deleteItemFromItemsList({ category, name })).then(res => {
      if (res.error) {
        console.error(res.error);
      } else {
        const newShoppingList = [...shoppingList];
        const newItemsList = [...itemsList];

        deleteItemFromList(shoppingList, { category, name });
        deleteItemFromList(itemsList, { category, name });

        changeShoppingList(newShoppingList);
        changeItemsList(newItemsList);
      }
    });
  }

  return (
    <div className="item-info">
      <div className="item-info__top">
        <button className="item-info__get-back-button" onClick={getBack}>
          <img src="/icons/get-back.svg" alt="" />
          back
        </button>
        {image && (
          <img className="item-info__image" src={image} alt="Item image" />
        )}
        <ul className="item-info__properties">
          <li className="item-info__property">
            <span className="item-info__property__label">Name</span>
            {name}
          </li>
          <li className="item-info__property">
            <span className="item-info__property__label">Category</span>
            {category}
          </li>
          {note && (
            <li className="item-info__property">
              <span className="item-info__property__label">Note</span>
              {note}
            </li>
          )}
        </ul>
      </div>
      <div className="item-info__buttons">
        {!loading && (
          <Button onClick={deleteItem} variant="secondary" type="button">
            Delete
          </Button>
        )}
        <Button onClick={addToList} variant="primary" type="button">
          {loading ? "Loading..." : "Add to list"}
        </Button>
      </div>
    </div>
  );
}
