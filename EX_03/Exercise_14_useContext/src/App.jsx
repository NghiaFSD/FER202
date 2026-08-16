import Cart from "./components/Cart.jsx";
import DishesList from "./components/DishesList.jsx";
import Theme from "./components/Theme.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <main>
          <header className="hero">
            <div>
              <p>FER202 · SHARED STATE</p>
              <h1>Exercise 14: useContext</h1>
              <span>
                Share theme and cart data across components without prop
                drilling.
              </span>
            </div>
            <div className="context-tree" aria-hidden="true">
              <strong>Provider</strong>
              <i />
              <div>
                <span>Menu</span>
                <span>Cart</span>
              </div>
            </div>
          </header>

          <Theme />

          <section className="cart-exercise-title">
            <span>02–03</span>
            <div>
              <h2>Cart Context with Real-time Totals</h2>
              <p>
                Add, update, remove and clear dishes. Count and value update
                immediately in every consumer.
              </p>
            </div>
          </section>

          <div className="shop-layout">
            <DishesList />
            <Cart />
          </div>
        </main>
      </CartProvider>
    </ThemeProvider>
  );
}

