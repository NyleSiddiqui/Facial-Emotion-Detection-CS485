import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <Form className="login">
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
          <Button type="submit" variant="primary">
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
