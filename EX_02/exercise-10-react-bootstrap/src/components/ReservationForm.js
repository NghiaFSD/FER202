import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

function ReservationForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <Container id="reservation" className="reservation-section">
      <h2 className="text-center">Book Your Table</h2>

      {submitted && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setSubmitted(false)}
        >
          Your reservation request has been sent.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row className="g-3">
          <Col xs={12} md={4}>
            <Form.Control
              required
              type="text"
              placeholder="Your Name *"
              aria-label="Your name"
            />
          </Col>

          <Col xs={12} md={4}>
            <Form.Control
              required
              type="email"
              placeholder="Your Email *"
              aria-label="Your email"
            />
          </Col>

          <Col xs={12} md={4}>
            <Form.Select required aria-label="Select a service">
              <option value="">Select a Service</option>
              <option value="dine-in">Dine in</option>
              <option value="takeaway">Take away</option>
              <option value="delivery">Delivery</option>
            </Form.Select>
          </Col>

          <Col xs={12}>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Please write your comment"
              aria-label="Reservation comment"
            />
          </Col>

          <Col xs={12}>
            <Button variant="warning" type="submit" className="send-button">
              Send Message
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default ReservationForm;
