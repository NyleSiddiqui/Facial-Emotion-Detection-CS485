/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { getResults, isAuthenticated } from "../fire/fire";
import Context from "../context";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingScreen from "../components/LoadingScreen";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDocument } from "../components/ResultsPdf";
import "../styles/App.css";

function PastResults() {
  const history = useHistory();
  const { notification, addNotification, removeNotification } =
    useContext(Context);

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    isAuthenticated().then((auth) => {
      if (auth) {
        getResults()
          .then((res) => {
            setResults(res);
            setIsLoading(false);
          })
          .catch((error) => {
            addNotification(error, "danger");
            setIsLoading(false);
          });
      } else {
        history.push("/login");
      }
    });
  }, []);

  return (
    <Container className="position-relative mt-3">
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
          {results.length !== 0 ? (
            <>
              <div className="d-flex justify-content-between align-items-center my-3">
                <h2>Past Results</h2>
                {<PDFDownloadLink
                  document={<PdfDocument data={results} />}
                  fileName="emotion-results.pdf"
                  style={{
                    textDecoration: "none",
                    padding: "10px",
                    color: "#4a4a4a",
                    position: "absolute",
                    right: "0px",
                    top: "0px",
                    backgroundColor: "#f2f2f2",
                    border: "1px solid #4a4a4a"
                  }}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading document..." : "Download PDF"
                  }
                </PDFDownloadLink>}
              </div>
              <Row xs={1} sm={3} md={4} lg={5} className="g-4">
                {results.map((result, idx) => {
                  result = result.data();
                  return (
                    <Col key={idx}>
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
        </>
      )}
    </Container>
  );
}

export default withRouter(PastResults);
