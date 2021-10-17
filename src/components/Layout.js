import React from "react";
import MyNav from "./MyNav.js";
import Footer from "./Footer.js";
import Container from "react-bootstrap/Container";

const Layout = ({ children }) => {
  return (
    <>
      <MyNav />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
