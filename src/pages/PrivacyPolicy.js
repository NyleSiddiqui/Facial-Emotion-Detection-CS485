import React, { useState } from "react";
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import pdf from '../privacy_policy.pdf';

const PrivacyPolicy = () => {
  const [defaultPdfFile] = useState(pdf);

  return (
    <div>
      <Worker 
        workerUrl='https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js'
      >
        <Viewer fileUrl = {defaultPdfFile} />
      </Worker>
    </div>
  );
};

export default PrivacyPolicy;