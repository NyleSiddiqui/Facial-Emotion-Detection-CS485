import React, { useRef, useState, useCallback, useEffect } from "react";
import Dropzone from "react-dropzone";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Webcam from "react-webcam";
import Happy from "../images/sample/happy.jpg";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {uploadPhoto, addEmotion} from '../fire/fire';
import * as tf from '@tensorflow/tfjs';

function UploadPage() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [alert, setAlert] = useState(null);
  const inputFileRef = useRef(null);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [model, setModel] = useState();
  console.log(model)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onFileChange = (e) => {
    setImgSrc(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleUploadFile = () => {
    inputFileRef.current.click();
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    
    fetch(imageSrc).then(res => res.blob()).then(blob => {
      let screenshot = new File([blob], "test.jpg", {type:'image/jpeg'})
      setFile(screenshot);
    })
    
  }, [webcamRef, setImgSrc]);

  const handleDrop = (file) => {
    setImgSrc(URL.createObjectURL(file[0]));
    setFile(file[0]);
  };

  const handleDetect = () => {
    uploadPhoto({file}).then(res => {
      console.log(res);
      let emotion = prompt("Enter Detected Emotion");
      addEmotion(res['url'], emotion)
    })
    handleShow();
    //setAlert("There was an error");
  };

  const loadModel = async (url) => {
    try {
      const model = await tf.loadLayersModel(url.model);
      model.summary();
      setModel(model);
      console.log("loaded model")
    } 
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // const url = {
    //   model: 'https://facial-emotion-detection.netlify.app/model.json'
    // }
    const url = {
      model: 'https://storage.googleapis.com/model-bucket69/model-content/model.json'
    }
    tf.ready().then(() => {
      loadModel(url)
    });
  }, [])

  return (
    <>
      {alert && (
        <Alert variant="danger" onClose={() => setAlert(null)} dismissible>
          The model was unable to detect an emotion from your image. Please
          upload a new one.
        </Alert>
      )}

      <Row className="mt-3">
        <Col lg={6}>
          <div className="upload-container m-auto">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
            <Button className="mt-2 w-50" variant="primary" onClick={capture}>
              Capture Image
            </Button>
          </div>
        </Col>
        <Col lg={6}>
          <div className="upload-container">
            <div className="drop-container">
              {imgSrc ? (
                <img src={imgSrc} alt="Capture" />
              ) : (
                <Dropzone
                  onDrop={handleDrop}
                  accept="image/*"
                  minSize={1024}
                  maxSize={3072000}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      <p>Drag'n'drop images, or click to select files</p>
                      <FontAwesomeIcon
                        icon={["fas", "cloud-upload-alt"]}
                        style={{ fontSize: "10em" }}
                      />
                    </div>
                  )}
                </Dropzone>
              )}
            </div>
            <input
              type="file"
              ref={inputFileRef}
              onChange={onFileChange}
              style={{ display: "none" }}
            />
            <Button
              className="w-50 mt-2"
              variant="primary"
              onClick={handleUploadFile}
            >
              {imgSrc ? "Reupload" : "Upload"} file
            </Button>
          </div>

          <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
              <Modal.Title>Emotion Detected!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <Image fluid src={Happy} />
                </Col>
                <Col className="m-auto text-center" md={6}>
                  <h3 className="mb-0">The following emotion was detected:</h3>
                  <h1 className="mt-0 huge">Happy</h1>
                  <h4>80% accuracy</h4>
                  <h3 className="mt-5">
                    <strong>Other emotions detected:</strong>
                  </h3>
                  <h4>Excitement - 12%</h4>
                  <h4>Anger - 8%</h4>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
        <Col className="mt-5 d-flex justify-content-center" xs={12}>
          <Button onClick={handleDetect}>Detect Emotion</Button>
        </Col>
      </Row>
    </>
  );
}

export default withRouter(UploadPage);
