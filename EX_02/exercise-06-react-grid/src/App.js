import { useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import { products } from "./data";

function App() {
  const [keyword, setKeyword] = useState("");
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <>
      <Header keyword={keyword} onKeywordChange={setKeyword} />

      <main id="products" className="container py-5">
        <h2>NEW PRODUCT</h2>
        <p className="text-muted">List product description</p>

        <div className="row g-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="alert alert-warning mt-3">No product found.</p>
        )}
      </main>
    </>
  );
}

export default App;
