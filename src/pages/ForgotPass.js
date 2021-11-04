import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {resetPassword} from '../fire/fire'

function ForgotPass({ history }) {
  const [email, setEmail] = useState("");

  function resetPass(event) {
    event.preventDefault()
    resetPassword({email}).then(() => {
      // Redirect back to the login page
      history.push("/login")
    })
  }

  return (
    <div className="login-container">
      <Form className="login">
        <h3>Forgot My Password</h3>
		<p class="w-75">Enter your email address below and you'll be sent a link where you can reset your password.</p>
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
            />{" "}Back to Login
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
