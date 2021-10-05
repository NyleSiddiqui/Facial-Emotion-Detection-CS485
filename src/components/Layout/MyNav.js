import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const MyNav = () => {
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container>
				<Row>
					<Col>
						<Navbar.Brand>
							Facial Emotion Detection
						</Navbar.Brand>
					</Col>
					<Col>
					</Col>
				</Row>
			</Container>
		</Navbar>
	)
}


export default MyNav;