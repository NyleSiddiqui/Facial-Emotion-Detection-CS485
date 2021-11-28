import React from "react";
import ReactLoading from "react-loading";
import "../styles/App.css";

function LoadingScreen() {
  return (
    <div className = 'loading-icon'>
      <ReactLoading type={"bars"} color={"blue"} height={200} width={200} />
    </div>
  )
}

export default LoadingScreen;