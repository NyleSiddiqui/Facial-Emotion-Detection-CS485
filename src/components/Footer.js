import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Nav } from "react-bootstrap";
import '../styles/App.css';

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" position='relative'>
      <Container>
        <Nav className='footer-item'>
          <Nav.Link href="/tos">Terms of Service</Nav.Link>
        </Nav>
        <Nav className='footer-item'>
          <Nav.Link href='/privacy_policy'>Privacy Policy</Nav.Link>
        </Nav>
        <Nav className='footer-item'>
          <div id='copyright-symbol'>&copy;</div>
          <span id='copyright-date'>{new Date().getFullYear()} Facial Emotion Detection! - All Rights Reserved</span>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Footer;