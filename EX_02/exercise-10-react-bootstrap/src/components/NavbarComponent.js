import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";

function NavbarComponent({ searchTerm, onSearchChange }) {
  function handleSubmit(event) {
    event.preventDefault();
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Navbar expand="lg" variant="dark" className="pizza-navbar">
      <Container>
        <Navbar.Brand href="#home" className="brand-title">
          Pizza House
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="pizza-navigation" />

        <Navbar.Collapse id="pizza-navigation">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#menu">About Us</Nav.Link>
            <Nav.Link href="#reservation">Contact</Nav.Link>
          </Nav>

          <Form className="d-flex search-form" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search pizza"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
            />
            <Button variant="danger" type="submit" aria-label="Submit search">
              &#128269;
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
