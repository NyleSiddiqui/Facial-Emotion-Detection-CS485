import React from "react";
import MyNav from "./MyNav.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <>
      <MyNav></MyNav>
      <Container id = "container">
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
      
    </>
  );
};

export default Layout;
