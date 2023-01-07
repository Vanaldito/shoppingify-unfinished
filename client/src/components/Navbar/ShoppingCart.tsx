const productQuantity = 3;

interface ShoppingCartProps {
  toggleAsideBar: () => void;
}

export default function ShoppingCart({ toggleAsideBar }: ShoppingCartProps) {
  return (
    <button className="navbar__shopping-cart" onClick={toggleAsideBar}>
      <img
        className="navbar__shopping-cart__image"
        src="/icons/shopping-cart.svg"
        width={20}
        height={20}
        alt="Shopping Cart"
      />
      <span className="navbar__shopping-cart__product-quantity">
        {productQuantity}
      </span>
    </button>
  );
}
