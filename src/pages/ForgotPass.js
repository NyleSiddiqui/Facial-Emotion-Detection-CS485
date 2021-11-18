import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { resetPassword } from "../fire/fire";
import Context from "../context";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ForgotPass({ history }) {
  const { notification, addNotification, removeNotification } =
    useContext(Context);
  const [email, setEmail] = useState("");

  function resetPass(event) {
    event.preventDefault();
    resetPassword({ email })
      .then(() => {
        // Redirect back to the login page
        history.push("/login");
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
        <h3>Forgot My Password</h3>
        <p class="w-75">
          Enter your email address below and you'll be sent a link where you can
          reset your password.
        </p>
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
        <div className="d-flex justify-content-between w-75 mt-2">
          <Button href="/login" variant="outline-dark">
            <FontAwesomeIcon
              icon={["fas", "arrow-left"]}
              style={{ fontSize: "12pt" }}
            />{" "}
            Back to Login
          </Button>
          <Button type="submit" variant="primary" onClick={resetPass}>
            Reset My Password
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default withRouter(ForgotPass);
