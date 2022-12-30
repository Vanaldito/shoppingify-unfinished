import "./Navbar.css";
import ShoopingCart from "./ShoppingCart";

export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar__logo">
        <img src="/logo.svg" width={42} height={42} alt="Shoppingify Logo" />
      </a>
      <ul className="navbar__links">
        <li>
          <a className="navbar__link navbar__link--current" href="/">
            <img
              className="navbar__link__image"
              src="/icons/menu.svg"
              width={20}
              height={20}
              alt="Menu"
            />
          </a>
        </li>
        <li>
          <a className="navbar__link" href="/">
            <img
              className="navbar__link__image"
              src="/icons/history.svg"
              width={20}
              height={20}
              alt="History"
            />
          </a>
        </li>
        <li>
          <a className="navbar__link" href="/">
            <img
              className="navbar__link__image"
              src="/icons/statistics.svg"
              width={20}
              height={20}
              alt="Statistics"
            />
          </a>
        </li>
      </ul>
      <ShoopingCart />
    </nav>
  );
}
