import React from "react";
import { withRouter } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login({ history }) {
	return (
		<Container>
			<Form>
				<Row>
					<Col sm={3}>
						<h3>Log Into Account</h3>

						<Form.Group>
							<Form.Label>Email Address</Form.Label>
							<Form.Control type="email" required />
						</Form.Group>

						<Form.Group>
							<Form.Label>Password </Form.Label>
							<Form.Control type="password" required />
							<a href="#">Forgot my password</a>
						</Form.Group>

						<Button type="submit" variant="primary">Log In</Button>
					</Col>
					<Col sm={3}>
						Don't have an account?<br/>
						[text] [text] [text]<br/><br/>

						<Button href="/create" variant="outline-secondary">Create an Account <FontAwesomeIcon
                        icon={["fas", "arrow-right"]}
                        style={{ fontSize: "12pt" }}/></Button>
					</Col>
				</Row>
			</Form>
		</Container>
	);
}

export default withRouter(Login);
