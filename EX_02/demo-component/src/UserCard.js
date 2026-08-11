import React from "react";
import { Card, Button } from "react-bootstrap";

function UserCard({ user }) {
  return (
    <Card className="h-100">
      <Card.Img
        src={user.avatar}
        alt={user.name}
        className="mx-auto mt-3"
        style={{
          width: "140px",
          height: "140px",
          objectFit: "contain",
        }}
      />

      <Card.Body>
        <div className="text-center">
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>{user.age}</Card.Text>
          <br/>
          <Card.Text>{user.email}</Card.Text>
          <Button variant="success">Like</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
