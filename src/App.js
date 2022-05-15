import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Card, Col, Row, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import List from "./List";

function App() {
  
  return (
    <Container>
      <Row>
        <List Component={List}/>
      </Row>
    </Container>
  );
}

export default App;