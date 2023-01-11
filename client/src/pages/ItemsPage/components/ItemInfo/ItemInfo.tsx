import { Button } from "../../../../components";
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
  return (
    <div className="item-info">
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
      <div className="item-info__buttons">
        <Button variant="secondary" type="button">
          Delete
        </Button>
        <Button variant="primary" type="button">
          Add to List
        </Button>
      </div>
    </div>
  );
}
