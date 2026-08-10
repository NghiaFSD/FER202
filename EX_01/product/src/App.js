const products = [
  { id: 1, name: "Laptop ASUS", inputPrice: 15000, outPrice: 18500, stock: 5 },
  { id: 2, name: "Chuột", inputPrice: 300, outPrice: 450, stock: 0 },
  { id: 3, name: "Bàn phím", inputPrice: 800, outPrice: 1200, stock: 10 },
  { id: 4, name: "Màn hình Dell", inputPrice: 3500, outPrice: 4200, stock: 2 }
];

function App() {
  const highestPriceProduct = products.reduce((max, product) =>
    product.outPrice > max.outPrice ? product : max
  );

  const lowestPriceProduct = products.reduce((min, product) =>
    product.outPrice < min.outPrice ? product : min
  );

  const productsByProfit = [...products].sort((a, b) => {
    const profitA = a.outPrice - a.inputPrice;
    const profitB = b.outPrice - b.inputPrice;
    return profitB - profitA;
  });

  return (
    <main>
      <h1>Quản lý sản phẩm</h1>

      <h2>1. Danh sách sản phẩm và trạng thái</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Giá nhập</th>
            <th>Giá bán</th>
            <th>Tồn kho</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.inputPrice}</td>
              <td>{product.outPrice}</td>
              <td>{product.stock}</td>
              <td>{product.stock > 0 ? "Còn hàng" : "Hết hàng"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>2. Sản phẩm có giá bán lớn nhất và nhỏ nhất</h2>
      <p>Lớn nhất: {highestPriceProduct.name} - {highestPriceProduct.outPrice}</p>
      <p>Nhỏ nhất: {lowestPriceProduct.name} - {lowestPriceProduct.outPrice}</p>

      <h2>3. Sắp xếp theo lợi nhuận giảm dần</h2>
      <p>Công thức: Lợi nhuận = Giá bán - Giá nhập</p>
      <ol>
        {productsByProfit.map((product) => (
          <li key={product.id}>
            {product.name}: {product.outPrice - product.inputPrice}
          </li>
        ))}
      </ol>
    </main>
  );
}

export default App;
