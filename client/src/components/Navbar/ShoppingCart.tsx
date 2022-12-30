const productQuantity = 3;

export default function ShoopingCart() {
  return (
    <div className="navbar__shopping-cart">
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
    </div>
  );
}
