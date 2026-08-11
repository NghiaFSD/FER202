function formatPrice(price) {
  return `${price.toLocaleString("vi-VN")} VND`;
}

function ProductCard({ product }) {
  return (
    <div className="col-sm-6 col-lg-3">
      <div className="card h-100 position-relative">
        {product.sale && (
          <span className="badge bg-warning position-absolute top-0 end-0 fs-6">
            Sale
          </span>
        )}

        <div className="product-image d-flex align-items-center justify-content-center text-secondary fs-4">
          280 x 280
        </div>

        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">
            <del className="text-muted">{formatPrice(product.oldPrice)}</del>
            <br />
            <span className="text-warning fw-bold">{formatPrice(product.price)}</span>
          </p>
          <button type="button" className="btn btn-primary">
            🛒 Buy now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
