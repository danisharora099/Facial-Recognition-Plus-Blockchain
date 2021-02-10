import axios from "axios";
import React, { useRef } from "react";
import S3 from "../s3/s3";
import "./Upload.css";
import CollegeInstance from "./college";

axios.defaults.timeout = 60 * 5 * 1000;

export default function Upload() {
  const fileInput = useRef();

  const handleSubmit = async e => {
    e.preventDefault();

    const s3 = new S3();
    document.getElementById("loader").classList.add("loader-active");
    document.getElementById("upload-form").classList.add("display-none");
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
      const video = document.getElementById("video");
      document.getElementById("finalResponse").classList.remove("display-none");
      video.setAttribute("src", studentDetails.data.s3_url);
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
      <div id="finalResponse" className="row display-none">
        <div className="col-7">
          <video
            id="video"
            width="500"
            height="500"
            src="https://facialr.s3.ap-south-1.amazonaws.com/python.avi"
            controls
          ></video>
        </div>
        <div className="col-5" id="found">
          <h2>FOUND!</h2>
          <br />
          <span className="found-text">
            <b>Danish Arora</b>, of class <b>CSE 7B</b>, roll number <b>418</b>
          </span>
        </div>
      </div>
    </div>
  );
}
