/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loginUser, isAuthenticated } from "../fire/fire";
import Context from "../context";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function Login({ history }) {
  const { notification, addNotification, removeNotification } =
    useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    isAuthenticated().then((auth) => {
      if (auth) {
        history.push("/detect");
      }
    });
  }, []);

  function login(event) {
    event.preventDefault();
    loginUser(email, password)
      .then(() => {
        history.push("/detect");
      })
      .catch((error) => {
        addNotification(error, "danger");
      });
  }

  return (
    <div className="login-container">
      <Form className="login">
        {Object.keys(notification).length !== 0 && (
          <Alert
            className="w-75"
            variant={notification.type}
            onClose={removeNotification}
            dismissible
          >
            {notification.message}
          </Alert>
        )}
        <h3>Facial Emotion Detection Log In</h3>
        <Form.Group className="w-75">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group className="w-75">
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <a href="/forgotpass">Forgot my password</a>
        </Form.Group>
        <div className="d-flex justify-content-between w-75 mt-2">
          <Button type="submit" variant="primary" onClick={login}>
            Log In
          </Button>
          <Button href="/create" variant="outline-dark">
            Create an Account{" "}
            <FontAwesomeIcon
              icon={["fas", "arrow-right"]}
              style={{ fontSize: "12pt" }}
            />
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default withRouter(Login);
