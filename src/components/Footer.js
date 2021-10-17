import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavDropdown, Nav } from "react-bootstrap";
import "../styles/MyNav.css";

const MyNav = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Nav>
          <Nav>
            <Nav.Link href="/tos">Terms of Service</Nav.Link>
          </Nav>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNav;
