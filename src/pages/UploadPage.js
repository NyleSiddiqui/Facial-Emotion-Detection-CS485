import React, { useRef, useState, useCallback } from "react";
import Dropzone from "react-dropzone";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Webcam from "react-webcam";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UploadPage() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const inputFileRef = useRef(null);

  const onFileChange = (e) => {
    setImgSrc(URL.createObjectURL(e.target.files[0]));
  };
  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const handleDrop = (file) => {
    setImgSrc(URL.createObjectURL(file[0]));
  };

  return (
    <>
      <Row>
        <Col>
          <div className="upload-container m-auto">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
            <Button variant="primary" onClick={capture}>
              Capture Image
            </Button>
          </div>
        </Col>
        <Col md={6}>
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
            <Button className="mt-2" variant="primary" onClick={onBtnClick}>
              {imgSrc ? "Reupload" : "Upload"} file
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default withRouter(UploadPage);
