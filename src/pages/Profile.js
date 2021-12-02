/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import {
  getProfile,
  setProfile,
  uploadProfilePhoto,
  isAuthenticated,
} from "../fire/fire";
import Context from "../context";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import LoadingScreen from "../components/LoadingScreen";

function Profile() {
  const history = useHistory();
  const { notification, addNotification, removeNotification } =
    useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  function updateProfile() {
    getProfile().then((profile) => {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setEmail(profile.email);
      setPhoto(profile.photo);
    });
  }

  useEffect(() => {
    isAuthenticated().then((auth) => {
      if (auth) {
        updateProfile();
        setIsLoading(false);
      } else {
        history.push("/login");
      }
    });
  }, []);

  function saveProfile(event) {
    event.preventDefault();
    let filename = { file };

    if (filename["file"] === "" || filename["file"] === undefined) {
      setProfile({ firstName }, { lastName }, "")
        .then(() => {
          updateProfile();
          addNotification("Profile updated.", "success");
        })
        .catch((error) => {
          addNotification(error, "danger");
        });
    } else {
      uploadProfilePhoto({ file })
        .then((url) => {
          setProfile({ firstName }, { lastName }, url)
            .then(() => {
              updateProfile();
              addNotification("Profile updated.", "success");
            })
            .catch((error) => {
              addNotification(error, "danger");
            });
        })
        .catch((error) => {
          addNotification(error, "danger");
        });
    }
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {Object.keys(notification).length !== 0 && (
            <Alert
              className="w-100"
              variant={notification.type}
              onClose={removeNotification}
              dismissible
            >
              {notification.message}
            </Alert>
          )}
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
                  <Form.Control type="email" value={email} disabled />
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
                  <Form.Control
                    type="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                </Form.Group>

                <Button
                  className="float-end mt-3"
                  type="submit"
                  variant="primary"
                  onClick={saveProfile}
                >
                  Save
                </Button>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default withRouter(Profile);
