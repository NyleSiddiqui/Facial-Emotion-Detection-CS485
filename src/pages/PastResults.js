/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { getResults } from "../fire/fire";
import Context from "../context";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/App.css";

function PastResults() {
  const { notification, addNotification, removeNotification } =
    useContext(Context);

  const [results, setResults] = useState([]);

  useEffect(() => {
    getResults()
      .then((res) => {
        setResults(res);
      })
      .catch((error) => {
        addNotification(error, "danger");
      });
  }, []);

  return (
    <Container>
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
      <h2>Past Results</h2>
      {results.length !== 0 ? (
        <>
          <a href="/">[ Download PDF ]</a>
          <Row xs={1} sm={3} md={4} lg={5} class="g-4">
            {results.map((result) => {
              result = result.data();
              return (
                <Col>
                  <Card>
                    <Card.Img variant="top" src={result.img} />
                    <Card.Body>
                      <Card.Title>{result.emotion}</Card.Title>
                      <Card.Text>Uploaded on {result.time}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </>
      ) : (
        <div className="results-container">
          <div className="results">
            <p id="verification-paragraph">
              <b>You do not have images to review!</b>
            </p>
            <p id="verification-paragraph">
              If you would like to see images here, click
            </p>
            <p id="verification-paragraph">
              the link below to go to the upload page!
            </p>
            <a id="detect-page-link" href="/detect">
              Upload page
            </a>
          </div>
        </div>
      )}
    </Container>
  );
}

export default withRouter(PastResults);
