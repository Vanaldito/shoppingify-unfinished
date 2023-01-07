import { NavLink } from "react-router-dom";
import { Logo } from "../Logo";
import "./Navbar.css";
import ShoppingCart from "./ShoppingCart";

interface NavbarProps {
  toggleAsideBar: () => void;
}

export default function Navbar({ toggleAsideBar }: NavbarProps) {
  return (
    <nav className="navbar">
      <Logo />
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
      <ShoppingCart toggleAsideBar={toggleAsideBar} />
    </nav>
  );
}
