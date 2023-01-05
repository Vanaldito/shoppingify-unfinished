import { FormField } from "../../../../components";
import "./AddNewItem.css";

export default function AddNewItem() {
  return (
    <div className="add-new-item">
      <h2 className="add-new-item__title">Add a new item</h2>
      <form className="add-new-item__form">
        <div className="add-new-item__form-fields">
          <FormField label="Name" placeholder="Enter a name" />
          <FormField label="Note (optional)" placeholder="Enter a note" />
          <FormField label="Image (optional)" placeholder="Enter a note" />
          <FormField label="Category" placeholder="Enter a category" />
        </div>
        <div className="add-new-item__buttons">
          <button className="add-new-item__cancel-button" type="button">
            Cancel
          </button>
          <button className="add-new-item__save-button" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
