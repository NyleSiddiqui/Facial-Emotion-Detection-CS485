import React, { useRef, useState, useCallback, useContext } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { uploadPhoto, addEmotion } from "../fire/fire";
import { detectEmotion } from "../fire/emotion";
import Context from "../context";
import Dropzone from "react-dropzone";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import ImageComp from "react-bootstrap/Image";
import Webcam from "react-webcam";

function UploadPage() {
  const { notification, addNotification, removeNotification } =
    useContext(Context);
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const inputFileRef = useRef(null);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [emotions, setEmotions] = useState(["NULL", "NULL", "NULL"]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onFileChange = (e) => {
    setImgSrc(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    // console.log(e.target.files[0]);
  };

  const handleUploadFile = () => {
    inputFileRef.current.click();
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);

    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        let screenshot = new File([blob], "test.jpg", { type: "image/jpeg" });
        setFile(screenshot);
      });
  }, [webcamRef, setImgSrc]);

  const handleDrop = (file) => {
    setImgSrc(URL.createObjectURL(file[0]));
    setFile(file[0]);
  };

  const handleDetect = () => {
    let file_ref = { file };
    file_ref = file_ref["file"];
    if (file_ref === null) {
      return;
    }
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        let image = new Image();
        image.width = 224;
        image.height = 224;
        image.src = reader.result;
        image.onload = () => {
          let emotions = detectEmotion(image);
          if (emotions[0] !== "NULL") {
            setEmotions(emotions);
            uploadPhoto({ file })
              .then((res) => {
                addEmotion(res["url"], emotions[0].emotion);
              })
              .catch((error) => {
                addNotification(error, "danger");
              });
            handleShow();
          }
        };
      },
      false
    );

    reader.readAsDataURL(file_ref);

    //setAlert("There was an error");
  };

  return (
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
                  <ImageComp fluid src={imgSrc} />
                </Col>
                <Col className="m-auto text-center" md={6}>
                  <h3 className="mb-0">The following emotion was detected:</h3>
                  <h1 className="mt-0 huge">{emotions[0].emotion}</h1>
                  <h4>{emotions[0].conf}% confidence</h4>
                  <h3 className="mt-5">
                    <strong>Other emotions detected:</strong>
                  </h3>
                  <h4>
                    {emotions[1].emotion} - {emotions[1].conf}%
                  </h4>
                  <h4>
                    {emotions[2].emotion} - {emotions[2].conf}%
                  </h4>
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
