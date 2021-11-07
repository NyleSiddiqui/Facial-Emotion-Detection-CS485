import React from "react";
import MyNav from "./MyNav.js";
import Footer from "./Footer.js";
import Container from "react-bootstrap/Container";
import "../styles/App.css";

const Layout = ({ children }) => {
  return (
    <body className="site">
      <MyNav />
      <Container className = 'site-content'>{children}</Container>
      <Footer />
    </body>
  );
};

export default Layout;
