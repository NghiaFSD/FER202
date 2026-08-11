import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserCard from './UserCard';
import { user1 } from './data';

function App() {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">User List</h2>

      <Row>
        {user1.map((user, index) => (
          <Col key={index} lg={3} md={6} sm={12} className="mb-4">
            <UserCard user={user} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;