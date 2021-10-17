import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Nav } from "react-bootstrap";
import CopyRightImg from '../images/copyright-img.png';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed='bottom'>
      <Container>
        <Nav className='footer-item'>
          <Nav.Link href="/tos">Terms of Service</Nav.Link>
        </Nav>
        <Nav className='footer-item'>
          <Nav.Link href='/privacy_policy'>Privacy Policy</Nav.Link>
        </Nav>
        <Nav className='footer-item'>
          <img src={ CopyRightImg } alt='Copyright Image' />
          <div id='copyright-date'>10/18/2021</div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Footer;
