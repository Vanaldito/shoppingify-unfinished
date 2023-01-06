import { useState } from "react";
import { FormField } from "../../../../components";
import { useFetchAndLoad } from "../../../../hooks";
import { addItemToItemsList } from "../../../../services";
import "./AddNewItem.css";

interface AddNewItemProps {
  reloadItemsList: () => void;
}

export default function AddNewItem({ reloadItemsList }: AddNewItemProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [image, setImage] = useState("");

  const { loading, callEndpoint } = useFetchAndLoad();

  function changeHandler(setter: (value: string) => void) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    if (!name.trim() || !category.trim()) return;

    callEndpoint(addItemToItemsList({ name, category }))
      .then(res => {
        if (res.error) console.error(res.error);
        else reloadItemsList();
      })
      .catch(err => console.error(err));

    setName("");
    setCategory("");
    setNote("");
    setImage("");
  }

  return (
    <div className="add-new-item">
      <h2 className="add-new-item__title">Add a new item</h2>
      <form onSubmit={submitHandler} className="add-new-item__form">
        <div className="add-new-item__form-fields">
          <FormField
            onChange={changeHandler(setName)}
            value={name}
            label="Name"
            placeholder="Enter a name"
          />
          <FormField
            onChange={changeHandler(setNote)}
            value={note}
            label="Note (optional)"
            placeholder="Enter a note"
          />
          <FormField
            onChange={changeHandler(setImage)}
            value={image}
            label="Image (optional)"
            placeholder="Enter a note"
          />
          <FormField
            onChange={changeHandler(setCategory)}
            value={category}
            label="Category"
            placeholder="Enter a category"
          />
        </div>
        <div className="add-new-item__buttons">
          {!loading && (
            <button className="add-new-item__cancel-button" type="button">
              Cancel
            </button>
          )}
          <button className="add-new-item__save-button" type="submit">
            {loading ? "Loading..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
