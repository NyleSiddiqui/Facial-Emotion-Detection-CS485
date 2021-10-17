import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavDropdown, Nav } from "react-bootstrap";
import "../styles/MyNav.css";

const MyNav = () => {

  const src = './HYPERS.png'

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
                  src={src}
                  alt='user pic'
                />
              </div>
            }
          >
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/editProfile">Edit</NavDropdown.Item>
            <NavDropdown.Item href="/results">
              Review Results
            </NavDropdown.Item>
            {/*Do text color in css*/}
            <NavDropdown.Divider />
            <NavDropdown.Item>Logout</NavDropdown.Item>{" "}
            {/* Need conditional if user is logged in*/}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNav;
