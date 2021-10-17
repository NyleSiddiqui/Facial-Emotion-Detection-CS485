import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavDropdown, Nav } from "react-bootstrap";
import "../styles/MyNav.css";
import UserImage from '../images/mitchell-small.png'

const MyNav = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Nav className="justify-content-left">
          <Navbar.Brand href="/detect">Facial Emotion Detection</Navbar.Brand>{" "}
        </Nav>
        <Nav className="justify-content-right">
          <NavDropdown id="nav-dropdown" 
            title= {
              <div>
                <img className="thumbnail-image"
                  src={UserImage}
                  alt='user pic'
                />
              </div>
            }
          >
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/results">
              Review Results
            </NavDropdown.Item>
            <NavDropdown.Divider />
            {/* TODO: Change url to log in page */}
            <NavDropdown.Item href="/">Logout</NavDropdown.Item>{" "}
            {/* Need conditional if user is logged in*/}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNav;
