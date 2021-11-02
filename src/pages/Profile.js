import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import {getProfile, setProfile, uploadProfilePhoto} from '../fire/fire'

function Profile() {
  const [firstName, setFirstName] = useState("Dylan");
  const [lastName, setLastName] = useState("Black");
  const [email, setEmail] = useState("blackdt0976@uwec.edu");
  const [photo, setPhoto] = useState("https://via.placeholder.com/200")
  const [file, setFile] = useState('');
  
  function updateProfile() {
    getProfile().then(profile => {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setEmail(profile.email);
      setPhoto(profile.photo);
    });
  }

  useEffect(() => {
    updateProfile();
  }, []);

  function saveProfile(event) {
    event.preventDefault();
    console.log({file})
    let filename = {file}
    console.log(filename['file'])
    if(filename['file'] === '' || filename['file'] === undefined) {
      setProfile({firstName}, {lastName}, '').then(() => {
        updateProfile();
      })      
    } else {
      uploadProfilePhoto({file}).then(url => {
        setProfile({firstName}, {lastName}, url).then(() => {
          updateProfile();
        })
      })
    }
  }

  return (
    <>
      <Row className="mt-4">
        <Col className="text-center align-middle" md={3}>
          <Image className="rounded-circle w-100" src={photo} />
          <h2 className="mt-3">
            {firstName} {lastName}
          </h2>
        </Col>
        <Col md={9}>
          <Form className="mt-3">
            <Form.Group>
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                disabled
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" value="password123" disabled />
              <Form.Text>
                <a href="/">Reset password</a>
              </Form.Text>
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Edit profile picture:</Form.Label>
              <Form.Control type="file" onChange={e => {setFile(e.target.files[0])}}/>
            </Form.Group>

            <Button className="float-end mt-3" type="submit" variant="primary" onClick={saveProfile}>
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default withRouter(Profile);
