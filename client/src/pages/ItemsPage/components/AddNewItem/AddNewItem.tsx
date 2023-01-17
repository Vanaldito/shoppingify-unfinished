import { useState } from "react";
import {
  Button,
  FieldWithSuggestions,
  FormError,
  FormField,
} from "../../../../components";
import { insertItemInItemsList } from "../../../../helpers";
import { useFetchAndLoad, useItemsList } from "../../../../hooks";
import { addItemToItemsList } from "../../../../services";
import "./AddNewItem.css";

interface AddNewItemProps {
  cancel: () => void;
}

export default function AddNewItem({ cancel }: AddNewItemProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [image, setImage] = useState("");

  const [error, setError] = useState("");

  const { loading, callEndpoint } = useFetchAndLoad();

  const { itemsList, changeItemsList } = useItemsList();

  function changeHandler(setter: (value: string) => void) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;
    if (!itemsList) return;

    if (!name.trim() || !category.trim()) return;

    callEndpoint(
      addItemToItemsList({
        name,
        category,
        note: note.trim() ? note.trim() : undefined,
        image: image.trim() ? image.trim() : undefined,
      })
    )
      .then(res => {
        if (res.error) setError(res.error);
        else {
          const newItemsList = [...itemsList];
          insertItemInItemsList(newItemsList, {
            category,
            name,
            image,
            note,
          });
          changeItemsList(newItemsList);
        }
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
      <div className="add-new-item__top">
        <h2 className="add-new-item__title">Add a new item</h2>
        <form
          onSubmit={submitHandler}
          className="add-new-item__form"
          id="add-new-item__form"
        >
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
        </form>
      </div>
      <div className="add-new-item__buttons">
        {!loading && (
          <Button onClick={cancel} variant="secondary" type="button">
            Cancel
          </Button>
        )}
        <Button variant="primary" type="submit" form="add-new-item__form">
          {loading ? "Loading..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
