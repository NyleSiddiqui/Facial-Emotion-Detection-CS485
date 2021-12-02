import React, { useState, useContext } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createAccount, setProfile, uploadProfilePhoto } from "../fire/fire";
import Context from "../context";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

// Tooltip for Password Requirements
const passwordTooltip = (
  <Popover id="popover-basic">
    <Popover.Header as="h2">Password Requirements</Popover.Header>
    <Popover.Body>
      <ul>
        <li>Minimum 8 characters</li>
        <li>Must contain a capital letter</li>
        <li>Must contain a lowercase letter</li>
        <li>Must contain a number</li>
      </ul>
    </Popover.Body>
  </Popover>
);

function CreateAccount() {
  let history = useHistory();
  const { notification, addNotification, removeNotification } =
    useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [file, setFile] = useState("");

  const handleCreate = (event) => {
    event.preventDefault();
    if (verifyPassword !== password) {
      addNotification("Passwords do not match.", "danger");
      return;
    }

    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password)) {
      createAccount({ email }, { password })
        .then(() => {
          uploadProfilePhoto({ file })
            .then((url) => {
              setProfile({ firstName }, { lastName }, url);
              history.push("/verification");
            })
            .catch((error) => {
              addNotification(error, "danger");
            });
        })
        .catch((error) => {
          addNotification(error, "danger");
        });
    } else {
      addNotification("Password does not meet requirements.", "danger");
    }
  };

  return (
    <>
      <div className="create-account-container">
        <Form className="create-account">
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
          <h3>Facial Emotion Detection Create Account</h3>

          <Row>
            <Col sm={12}></Col>
            <Col sm={6}>
              <h4>Account Info</h4>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onInput={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  Password
                  <OverlayTrigger overlay={passwordTooltip}>
                    <a href="/" className="ms-1">
                      <FontAwesomeIcon
                        icon={["fas", "question-circle"]}
                        style={{ fontSize: "1em" }}
                      />
                    </a>
                  </OverlayTrigger>
                </Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onInput={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Retype Password</Form.Label>
                <Form.Control
                  type="password"
                  value={verifyPassword}
                  onInput={(e) => {
                    setVerifyPassword(e.target.value);
                  }}
                  required
                />
              </Form.Group>
            </Col>

            <Col sm={6}>
              <h4>Personal Info</h4>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="firstname"
                  value={firstName}
                  onInput={(e) => {
                    setFirstName(e.target.value);
                  }}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="lastname"
                  value={lastName}
                  onInput={(e) => {
                    setLastName(e.target.value);
                  }}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Check inline required /> I agree to the{" "}
                <a href="/privacy_policy" target="_blank">
                  Privacy Policy
                </a>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-around w-100 mt-2">
            <Button href="/login" variant="outline-dark">
              <FontAwesomeIcon
                icon={["fas", "arrow-left"]}
                style={{ fontSize: "12pt" }}
              />{" "}
              Login
            </Button>
            <Button type="submit" variant="primary" onClick={handleCreate}>
              Create Account
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default withRouter(CreateAccount);
