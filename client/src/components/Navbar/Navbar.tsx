import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import ShoppingCart from "./ShoppingCart";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        <img src="/logo.svg" width={42} height={42} alt="Shoppingify Logo" />
      </Link>
      <ul className="navbar__links">
        <li>
          <NavLink
            className={({ isActive }) =>
              `navbar__link${isActive ? " navbar__link--active" : ""}`
            }
            to="/"
          >
            <img
              className="navbar__link__image"
              src="/icons/menu.svg"
              width={20}
              height={20}
              alt="Menu"
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `navbar__link${isActive ? " navbar__link--active" : ""}`
            }
            to="/history"
          >
            <img
              className="navbar__link__image"
              src="/icons/history.svg"
              width={20}
              height={20}
              alt="History"
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `navbar__link${isActive ? " navbar__link--active" : ""}`
            }
            to="/statistics"
          >
            <img
              className="navbar__link__image"
              src="/icons/statistics.svg"
              width={20}
              height={20}
              alt="Statistics"
            />
          </NavLink>
        </li>
      </ul>
      <ShoppingCart />
    </nav>
  );
}
