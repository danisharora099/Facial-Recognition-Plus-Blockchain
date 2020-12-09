import axios from "axios";

import React, { useRef } from "react";
import S3 from "../s3/s3";

export default function Upload() {
  const fileInput = useRef();
  const s3 = new S3();
  const handleSubmit = async e => {
    e.preventDefault();
    const videoUrl = await s3.uploadFile(file, filename);
    try {
      const studentDetails = axios.post("http://localhost:4000", { videoUrl });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h1>Upload</h1>

      <form onSubmit={handleSubmit()}>
        <div>
          <input type="file" ref={fileInput} />
        </div>
        <button>Add</button>
      </form>
    </div>
  );
}
