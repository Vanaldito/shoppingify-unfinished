import { Navbar } from "../../components";
import { itemsInfo } from "../../constants";
import { Item } from "./components";
import "./ItemsPage.css";

export default function ItemsPage() {
  return (
    <div className="home-page">
      <Navbar />
      <main className="home-page__main">
        <h1 className="home-page__title">
          <span className="yellow-text">Shoppingify</span> allows you take your
          shopping list wherever you go
        </h1>
        {itemsInfo.map(({ category, items }) => (
          <section className="home-page__items-section" key={category}>
            <h2 className="home-page__items-category">{category}</h2>
            <ul className="home-page__items-list">
              {items.map(item => (
                <li className="home-page__items-list__item" key={item}>
                  <Item itemName={item} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
