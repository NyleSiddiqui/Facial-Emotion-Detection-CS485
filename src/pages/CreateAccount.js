import React from 'react'
import { withRouter } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

// Tooltip for Password Requirements
const passwordTooltip = (
	<Popover id="popover-basic">
		<Popover.Header as="h2">Password Requirements</Popover.Header>
		<Popover.Body>
			<ul>
				<li>Minimum 8 characters</li>
				<li></li>
			</ul>
		</Popover.Body>
	</Popover>
)

function CreateAccount() {
	return (
		<Container>
			<Form>
				<Row>
					<Col sm={6}>
						<h3>Account Info</h3>
						<Form.Group>
							<Form.Label>Email Address</Form.Label>
							<Form.Control type="email" required />
						</Form.Group>
						
						<Form.Group>
							<Form.Label>
								Password 
								<OverlayTrigger overlay={passwordTooltip}>
									<a href="">(??)</a>
								</OverlayTrigger>
							</Form.Label>
							<Form.Control type="password" required />
						</Form.Group>

						<Form.Group>
							<Form.Label>Retype Password</Form.Label>
							<Form.Control type="password" required />
						</Form.Group>
					</Col>
					
					<Col sm={6}>
						<h3>Personal Info</h3>
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

						<Form.Group>
							<Form.Check inline label="I agree to the Privacy Policy" required/>
						</Form.Group>

						<Button type="submit">Create Account</Button>
					</Col>
				</Row>
			</Form>
		</Container>
	)
}

export default withRouter(CreateAccount);