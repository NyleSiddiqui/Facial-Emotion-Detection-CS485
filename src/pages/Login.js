import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "react-bootstrap/Alert";
import {loginUser} from '../fire/fire'


function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);

  function login(event) {
    event.preventDefault()
    loginUser({email}, {password}).then(() => {
      history.push("/profile");
    })
  }

  return (
    <div className="login-container">
      <Form className="login">
        <h3>Facial Emotion Detection Log In</h3>
        {alert && (
          <Alert variant="success" onClose={() => setAlert(null)} dismissible className="w-auto">
            Your email has been verified. You can now log in below.
          </Alert>
        )}
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
          <a href="/">Forgot my password</a>
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
