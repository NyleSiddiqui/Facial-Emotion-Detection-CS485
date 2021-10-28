import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {createAccount} from "../fire/fire"

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
  const [alert, setAlert] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleCreate = () => {
    createAccount({email}, {password})
    history.push("/verification");
    // setAlert("Message");
  }

  return (
    <>
    <div className="create-account-container">
      <Form className="create-account">
        <Row>
          <Col sm={12}>
            <h3>Facial Emotion Detection Create Account</h3>
          </Col>
        </Row>
        {alert && (
        <Row>
          <Col sm={12}>
            <Alert variant="danger" onClose={() => setAlert(null)} dismissible className="w-auto">
              { /*Your password must be at least 8 characters long and have lowercase and uppercase letters and have a number.*/ }
              The email address you entered is already in use.
            </Alert>
          </Col>
        </Row>
        )}
        <Row>
          <Col sm={6}>
            <h4>Account Info</h4>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" value={email} 
              onInput={e => {setEmail(e.target.value)}} required />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Password
                <OverlayTrigger overlay={passwordTooltip}>
                  <a href="/" className="ms-1"><FontAwesomeIcon
                        icon={["fas", "question-circle"]}
                        style={{ fontSize: "1em" }}
                      />
                    </a>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control type="password" value={password} 
              onInput={e => {setPassword(e.target.value)}} required />
            </Form.Group>

            <Form.Group>
              <Form.Label>Retype Password</Form.Label>
              <Form.Control type="password" required />
            </Form.Group>
          </Col>

          <Col sm={6}>
            <h4>Personal Info</h4>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="firstname" required />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="lastname" required />
            </Form.Group>

            <Form.Group>
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" required />
            </Form.Group>
            <br/>
            <Form.Group>
              <Form.Check
                inline
                required
              /> I agree to the <a href="/privacy_policy" target="_blank">Privacy Policy</a>
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-around w-100 mt-2">
              <Button href="/login" variant="outline-dark">
              <FontAwesomeIcon
                  icon={["fas", "arrow-left"]}
                  style={{ fontSize: "12pt" }}
                />{" "}Login
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
