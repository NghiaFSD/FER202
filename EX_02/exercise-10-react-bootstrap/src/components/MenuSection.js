import { Alert, Col, Container, Row } from "react-bootstrap";
import menu1 from "../assets/images/menu1.jpg";
import menu2 from "../assets/images/menu2.jpg";
import menu3 from "../assets/images/menu3.jpg";
import menu4 from "../assets/images/menu4.jpg";
import MenuCard from "./MenuCard";

const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    image: menu1,
    price: "$24.00",
    oldPrice: "$40.00",
    label: "SALE"
  },
  {
    id: 2,
    name: "Mushroom Pizza",
    image: menu2,
    price: "$25.00"
  },
  {
    id: 3,
    name: "Hawaiian Pizza",
    image: menu3,
    price: "$30.00",
    label: "NEW"
  },
  {
    id: 4,
    name: "Pesto Pizza",
    image: menu4,
    price: "$30.00",
    oldPrice: "$50.00",
    label: "SALE"
  }
];

function MenuSection({ searchTerm }) {
  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <Container id="menu" className="menu-section">
      <h2>Our Menu</h2>

      <Row className="g-4">
        {filteredItems.map((item) => (
          <Col key={item.id} xs={12} sm={6} lg={3}>
            <MenuCard item={item} />
          </Col>
        ))}
      </Row>

      {filteredItems.length === 0 && (
        <Alert variant="warning" className="mt-4">
          No pizza matches your search.
        </Alert>
      )}
    </Container>
  );
}

export default MenuSection;
