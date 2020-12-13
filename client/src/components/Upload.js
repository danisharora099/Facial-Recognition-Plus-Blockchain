import axios from "axios";
import React, { useRef } from "react";
import S3 from "../s3/s3";
import "./Upload.css";

axios.defaults.timeout = 60 * 5 * 1000;

export default function Upload() {
  const fileInput = useRef();

  const handleSubmit = async e => {
    e.preventDefault();
    const s3 = new S3();
    document.getElementById("loader").classList.add("loader-active");
    
    const file = fileInput.current.files[0];
    const filename = file.name;
    const s3Response = await s3.uploadFile(file, filename);
    console.log(s3Response);
    const videoUrl = s3Response.location;
    try {
      console.log("sending data to node");
      const studentDetails = await axios.post(
        "http://localhost:4000",
        { videoUrl },
        { timeout: 10000000 }
        );
        console.log("received on client - ", studentDetails.data);
      document.getElementById("loader").classList.remove("loader-active");
      document.getElementById("upload-form").classList.remove("display-none");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="upload">
      <div id="loader" class="loader">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>

      <div className="container mt-2">
        <h1>Facial recognition, for HMR, made easy.</h1>
        <form id="upload-form" onSubmit={handleSubmit}>
          <div>
            <input
              id="uploadInput"
              type="file"
              ref={fileInput}
              onChange={() => {
                const inputValue = document
                  .getElementById("uploadInput")
                  .value.split("\\");
                const path = inputValue[inputValue.length - 1];
                document.getElementById("uploadProxy").innerText = path + "  ✓";
              }}
            />
          </div>
          <span
            id="uploadProxy"
            onClick={() => {
              document.getElementById("uploadInput").click();
            }}
          >
            Select a file
          </span>
          <button id="uploadBtn">Upload</button>
        </form>
      </div>
    </div>
  );
}
