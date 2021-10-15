import React from "react";
import MyNav from "./MyNav.js";
import Container from "react-bootstrap/Container";

const Layout = ({ children }) => {
  return (
    <>
      <MyNav></MyNav>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
