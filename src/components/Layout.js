import React from "react";
import MyNav from "./MyNav.js";
import Footer from "./Footer.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Layout = ({ children }) => {
  return (
    <>
      <MyNav />
      <Container>
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
