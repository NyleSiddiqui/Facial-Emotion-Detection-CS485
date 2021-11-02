import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Happy from "../images/sample/happy.jpg";
import Sad from "../images/sample/sad.jpg";
import Angry from "../images/sample/angry.jpg";
import {getResults} from '../fire/fire'

function PastResults() {
  const defaultCard = (<Col>
      <Card>
        <Card.Img variant="top" src={Happy} />
        <Card.Body>
          <Card.Title>Happy</Card.Title>
          <Card.Text>Uploaded on 9/27/2021 @ 12:00 am</Card.Text>
        </Card.Body>
      </Card>
    </Col>)

  const [results, setResults] = useState(null);
  const [cards, setCards] = useState(defaultCard)

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

  return (
    <Container>
      <h2>Past Results</h2>
      <a href="/">[ Download PDF ]</a>
      <Row xs={1} sm={3} md={4} lg={5} class="g-4">
        {cards}
        {/* <Col>
          <Card>
            <Card.Img variant="top" src={Happy} />
            <Card.Body>
              <Card.Title>Happy</Card.Title>
              <Card.Text>Uploaded on 9/27/2021 @ 12:00 am</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={Sad} />
            <Card.Body>
              <Card.Title>Sad</Card.Title>
              <Card.Text>Uploaded on 9/27/2021 @ 12:00 am</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={Angry} />
            <Card.Body>
              <Card.Title>Angry</Card.Title>
              <Card.Text>Uploaded on 9/27/2021 @ 12:00 am</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={Happy} />
            <Card.Body>
              <Card.Title>Happy</Card.Title>
              <Card.Text>Uploaded on 9/27/2021 @ 12:00 am</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={Sad} />
            <Card.Body>
              <Card.Title>Sad</Card.Title>
              <Card.Text>Uploaded on 9/27/2021 @ 12:00 am</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={Angry} />
            <Card.Body>
              <Card.Title>Angry</Card.Title>
              <Card.Text>Uploaded on 9/27/2021 @ 12:00 am</Card.Text>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
    </Container>
  );
}

export default withRouter(PastResults);
