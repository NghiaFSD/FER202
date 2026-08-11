import { Badge } from 'react-bootstrap';

function UserProduct({ product }) {
  const isAvailable = product.stock > 0;

  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.inputPrice}</td>
      <td>{product.outPrice}</td>
      <td>{product.stock}</td>
      <td>{product.outPrice - product.inputPrice}</td>
      <td>
        <Badge bg={isAvailable ? 'success' : 'danger'}>
          {isAvailable ? 'Buy now' : 'Out of stock'}
        </Badge>
      </td>
    </tr>
  );
}

export default UserProduct;