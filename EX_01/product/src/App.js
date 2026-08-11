import { Container, Table } from 'react-bootstrap';
import { products } from './data';
import UserProduct from './UserProduct';

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
    <Container className="py-4">
      <h1 className="text-center mb-4">Product Management</h1>

      <h2 className="mb-3">1. Product List and Status</h2>

      <Table striped bordered hover responsive className="text-center align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Input Price</th>
            <th>Output Price</th>
            <th>Stock</th>
            <th>Profit</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <UserProduct
              key={product.id}
              product={product}
            />
          ))}
        </tbody>
      </Table>

      <h2 className="mt-5">
        2. Products with the Highest and Lowest Selling Prices
      </h2>

      <p>
        <strong>Highest:</strong> {highestPriceProduct.name} –{' '}
        {highestPriceProduct.outPrice}
      </p>

      <p>
        <strong>Lowest:</strong> {lowestPriceProduct.name} –{' '}
        {lowestPriceProduct.outPrice}
      </p>

      <h2 className="mt-5">3. Sort by Profit (Descending)</h2>

      <p>Profit = Output Price - Input Price</p>

      <Table striped bordered hover responsive>
        <thead className="table-primary">
          <tr>
            <th>Rank</th>
            <th>Product</th>
            <th>Profit</th>
          </tr>
        </thead>

        <tbody>
          {productsByProfit.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.outPrice - product.inputPrice}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;