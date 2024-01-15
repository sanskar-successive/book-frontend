import axios from "../../axiosConfig";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./BulkErrorDetail.css"; 
import ErrorPage from "../errorPage/ErrorPage";

const BulkErrorDetail = () => {
  const { session_id } = useParams();

  const [bulkErrors, setBulkErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("");

  const handleApiResponse = async () => {
    try {
      const apiResponse = await axios.get(
        `http://localhost:5000/api/bulk-uploads-errors/${session_id}`
      );
      console.log(apiResponse.data);
      setBulkErrors(apiResponse.data.bulkUploadErrorDetail);
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrors(error.message)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleApiResponse();
  }, [session_id]);

  if(loading){
    return <h2>Loading...</h2>
  }

  if(errors){
    return <ErrorPage errorMessage={errors} />
  }

  return (
    <div className="bulk-error-container">
      <div className="table-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Row Number</th>
                <th>Error Details</th>
              </tr>
            </thead>

            <tbody>
              {bulkErrors?.map((item, index) => (
                <tr key={index}>
                  <td role="error-row">{item.rowNumber}</td>
                  <td role="error-message">{item.errorDetails}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BulkErrorDetail;
