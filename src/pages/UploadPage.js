import React, { useRef, useState, useCallback } from "react";
import Dropzone from "react-dropzone";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Webcam from "react-webcam";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UploadPage() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [alert, setAlert] = useState(null);
  const inputFileRef = useRef(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onFileChange = (e) => {
    setImgSrc(URL.createObjectURL(e.target.files[0]));
  };

  const handleUploadFile = () => {
    inputFileRef.current.click();
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const handleDrop = (file) => {
    setImgSrc(URL.createObjectURL(file[0]));
  };

  const handleDetect = () => {
    handleShow();
    //setAlert("There was an error");
  };

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
                  <Image fluid src={imgSrc} />
                </Col>
                <Col md={6}>
                  <Image fluid src={imgSrc} />
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
