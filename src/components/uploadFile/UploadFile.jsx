import React, { useState } from "react";
import "./UploadFile.css";
import axios from "../../axiosConfig";
import ErrorPage from "../../pages/errorPage/ErrorPage";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");

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
      setMessage("File uploading started")
      console.log("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrors(error.message)
    }
  };

  if (errors) {
    return <ErrorPage errorMessage={errors} />
  }

  return (
    <div className="upload-file-container">
      <h3>Upload CSV File</h3>
      <label htmlFor="file-uploader">
        <input placeholder="select file" type="file" onChange={handleFileChange} />
      </label>
      <button className="upload-button" onClick={handleFileUpload}>
        Upload
      </button>
      {message.length > 0 ? <p>{message}</p> : null}
    </div>
  );
};

export default UploadFile;
