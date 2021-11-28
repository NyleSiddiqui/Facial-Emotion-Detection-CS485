/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { isAuthenticated } from "../fire/fire";
import { useHistory, useLocation } from "react-router-dom";
import MyNav from "./MyNav.js";
import Footer from "./Footer.js";
import Container from "react-bootstrap/Container";
import "../styles/App.css";

const Layout = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    isAuthenticated().then((auth) => {
      if (
        !auth &&
        location.pathname !== "/tos" &&
        location.pathname !== "/privacy_policy"
      ) {
        history.push("/login");
      }
    });
  }, []);

  return (
    <div className="site">
      <MyNav />
      <Container className="site-content">{children}</Container>
      <Footer />
    </div>
  );
};

export default Layout;
