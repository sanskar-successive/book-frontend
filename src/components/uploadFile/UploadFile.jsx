import React, { useState } from "react";
import "./UploadFile.css";
import axios from "axios";

const UploadFile = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/bulk-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="upload-file-container">
      <h3>Upload CSV File</h3>
      <label htmlFor="file-uploader">Select</label>
      <input type="file" onChange={handleFileChange} />
      <button className="upload-button" onClick={handleFileUpload}>
        Upload
      </button>
    </div>
  );
};

export default UploadFile;
