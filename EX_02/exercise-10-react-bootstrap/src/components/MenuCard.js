import { Badge, Button, Card } from "react-bootstrap";

function MenuCard({ item }) {
  return (
    <Card className="h-100 menu-card">
      <div className="menu-image-wrap">
        {item.label && (
          <Badge bg="warning" text="dark" className="menu-label">
            {item.label}
          </Badge>
        )}
        <Card.Img variant="top" src={item.image} alt={item.name} />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          {item.oldPrice && (
            <span className="old-price">{item.oldPrice}</span>
          )}
          <span className="current-price">{item.price}</span>
        </Card.Text>
        <Button variant="dark" className="mt-auto w-100">
          Buy
        </Button>
      </Card.Body>
    </Card>
  );
}

export default MenuCard;
