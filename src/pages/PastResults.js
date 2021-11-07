import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {getResults} from '../fire/fire';
import '../styles/App.css';

function PastResults() {
  const [cards, setCards] = useState('')

  useEffect(()=> {
    // console.log("hello?")
    getResults().then(res => {
      // setResults(res);
      // console.log(res[0])
      let columns = []
        res.forEach(doc => {
          doc = doc.data();
          console.log(doc)
          columns.push(<Col>
            <Card>
              <Card.Img variant="top" src={doc['img']} />
              <Card.Body>
                <Card.Title>{doc['emotion']}</Card.Title>
                <Card.Text>Uploaded on {doc['time']}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          )
        })
      setCards(columns)
    })
  }, [])

  if (!cards.length) // If no past results
  {
    return (
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
          <a id='detect-page-link' href='/detect'>Upload page</a>
      </div>
    </div>
    )
  }
  else
  {
    return (
      <Container>
        <h2>Past Results</h2>
        <a href="/">[ Download PDF ]</a>
        <Row xs={1} sm={3} md={4} lg={5} class="g-4">
          {cards}
        </Row>
      </Container>
    );
  }
}

export default withRouter(PastResults);
