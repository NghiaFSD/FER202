import { useCart } from "../contexts/CartContext.jsx";

export default function Cart() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeOne,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <aside className="cart-panel">
      <div className="cart-header">
        <div>
          <p className="overline">YOUR ORDER</p>
          <h2>Shopping Cart</h2>
        </div>
        <span className="cart-count">{cartCount}</span>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div aria-hidden="true">＋</div>
          <strong>Your cart is empty</strong>
          <p>Add a dish from the menu to get started.</p>
        </div>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt="" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>${item.price} each</p>
                <div className="quantity-control">
                  <button
                    onClick={() => removeOne(item.id)}
                    aria-label={"Decrease " + item.name}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    aria-label={"Increase " + item.name}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="cart-item-price">
                <strong>${(Number(item.price) * item.quantity).toFixed(2)}</strong>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="cart-footer">
        <div>
          <span>Total items</span>
          <strong>{cartCount}</strong>
        </div>
        <div className="total-row">
          <span>Total value</span>
          <strong>${cartTotal.toFixed(2)}</strong>
        </div>
        <button
          className="clear-cart"
          onClick={clearCart}
          disabled={cartItems.length === 0}
        >
          Clear Cart
        </button>
      </div>
    </aside>
  );
}

