import "./ItemInfo.css";

interface ItemInfoProps {
  name: string;
  category: string;
  image?: string;
  note?: string;
}

export default function ItemInfo({
  name,
  category,
  image,
  note,
}: ItemInfoProps) {
  return (
    <div className="item-info">
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
      <div className="item-info__buttons">
        <button
          className="item-info__button item-info__button--delete"
          type="button"
        >
          Delete
        </button>
        <button
          className="item-info__button item-info__button--add-to-list"
          type="button"
        >
          Add to list
        </button>
      </div>
    </div>
  );
}
