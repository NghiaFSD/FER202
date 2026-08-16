import { useCart } from "../contexts/CartContext.jsx";
import { dishes } from "../data/dishes.js";

export default function DishesList() {
  const { addToCart, cartCount, cartTotal } = useCart();

  return (
    <section className="dishes-section">
      <div className="menu-header">
        <div>
          <p className="overline">OUR MENU</p>
          <h2>Choose your dishes</h2>
        </div>
        <div className="live-summary" aria-live="polite">
          <div>
            <span>Items</span>
            <strong>{cartCount}</strong>
          </div>
          <div>
            <span>Value</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      <div className="dishes-grid">
        {dishes.map((dish) => (
          <article className="dish-card" key={dish.id}>
            <div className="dish-image-wrap">
              <img src={dish.image} alt={dish.name} />
              {dish.label && <span className="dish-label">{dish.label}</span>}
            </div>
            <div className="dish-content">
              <div className="dish-heading">
                <div>
                  <span>{dish.category}</span>
                  <h3>{dish.name}</h3>
                </div>
                <strong>${dish.price}</strong>
              </div>
              <p>{dish.description}</p>
              <button onClick={() => addToCart(dish)}>
                <span aria-hidden="true">+</span> Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

