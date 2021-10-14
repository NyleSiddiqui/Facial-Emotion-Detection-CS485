import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DropdownButton, NavDropdown, Nav } from "react-bootstrap";
import "../styles/MyNav.css";

const MyNav = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Row>
          <Col>
            <Navbar.Brand href="/detect">Facial Emotion Detection</Navbar.Brand> {/*Do we want this to href?*/}
          </Col>
          <Col>
            <Nav className="ml-auto">
              <Nav.Link href="/tos">Terms of Service</Nav.Link>
            </Nav>
          </Col>
          <Col>
            <Nav justify className="justify-content-end">
              <NavDropdown id="nav-dropdown" title="Profile">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/editProfile">Edit</NavDropdown.Item>
                <NavDropdown.Item href="/results">Review Results</NavDropdown.Item>
                <NavDropdown.Item><Nav.Link id="logout-link">Logout</Nav.Link></NavDropdown.Item> {/*Do text color in css*/}
                <NavDropdown.Divider />
                <NavDropdown.Item>Logout</NavDropdown.Item> {/* Need conditional if user is logged in*/}
              </NavDropdown>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default MyNav;
