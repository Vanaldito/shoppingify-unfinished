import { useState } from "react";
import {
  Button,
  FieldWithSuggestions,
  FormError,
  FormField,
} from "../../../../components";
import { useFetchAndLoad } from "../../../../hooks";
import { ItemsList } from "../../../../models";
import { addItemToItemsList } from "../../../../services";
import "./AddNewItem.css";

interface AddNewItemProps {
  itemsList: ItemsList | null;
  reloadItemsList: () => void;
}

export default function AddNewItem({
  itemsList,
  reloadItemsList,
}: AddNewItemProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [image, setImage] = useState("");

  const [error, setError] = useState("");

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
        if (res.error) setError(res.error);
        else reloadItemsList();
      })
      .catch(err => console.error(err));

    setName("");
    setCategory("");
    setNote("");
    setImage("");
  }

  const categorySuggestions =
    itemsList
      ?.map(value => value.category)
      .filter(
        availableCategory =>
          availableCategory
            .toLowerCase()
            .includes(category.toLowerCase().trimLeft()) &&
          availableCategory.toLowerCase() !== category.toLowerCase().trim()
      ) ?? null;

  return (
    <div className="add-new-item">
      <h2 className="add-new-item__title">Add a new item</h2>
      <form onSubmit={submitHandler} className="add-new-item__form">
        {error && <FormError error={error} clearError={() => setError("")} />}
        <div className="add-new-item__form-fields">
          <FormField
            onChange={changeHandler(setName)}
            value={name}
            label="Name"
            placeholder="Enter a name"
            required={true}
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
          <FieldWithSuggestions
            selectSuggestion={suggestion => setCategory(suggestion)}
            suggestions={categorySuggestions}
            onChange={changeHandler(setCategory)}
            value={category}
            label="Category"
            placeholder="Enter a category"
            required={true}
          />
        </div>
        <div className="add-new-item__buttons">
          {!loading && (
            <Button variant="secondary" type="button">
              Cancel
            </Button>
          )}
          <Button variant="primary" type="submit">
            {loading ? "Loading..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
