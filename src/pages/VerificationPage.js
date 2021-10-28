import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import {verifyEmail} from "../fire/fire"

function VerificationPage() {
  const [show, setShow] = useState(false);

  const resendEmail = () => {
    verifyEmail();
    setShow(true)
  }

  if (show)
  {
    return (
      <div className="verification-container">
        <div className="verification">
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Email Sent!</Alert.Heading>
          </Alert>
        </div>
      </div>
    );
  }
  return (
    <div className="verification-container">
      <div className="verification">
        <p id="verification-paragraph">
          <b>Verification email sent!</b>
        </p>
        <p id="verification-paragraph">
          If you did not get the email
        </p>
        <p id="verification-paragraph">
          just click resend!
        </p>
        <Button id="resend-btn" onClick={resendEmail}>
          Resend
        </Button>
      </div>
    </div>
  );
}

export default withRouter(VerificationPage);


