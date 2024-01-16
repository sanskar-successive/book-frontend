import axios from "../../axiosConfig";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import "./BulkUploadList.css";
import ErrorPage from "../errorPage/ErrorPage";

const BulkUploadList = () => {
  const [bulkUploads, setBulkUploads] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("");

  const handleViewBulkUploadErrors = (session_id) => {
    navigate(`/bulk-uploads/${session_id}`);
  };

  const fetchApiResponse = async () => {

    try {
      const apiResponse = await axios.get(
        `http://localhost:5000/api/bulk-uploads-list`
      );
      setBulkUploads(apiResponse.data.bulkUploads);

    } catch (error) {
      console.log("some error in fetching bulk upoload details", error);
      setErrors(error.message)
    }
    finally {
      setLoading(false);
    }

  };

  useEffect(()=>{
    fetchApiResponse();
  },[])

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if(errors){
    return <ErrorPage errorMessage={errors} />
  }

  return (
    <div className="bulk-upload-container">
      <table>
        <thead>
          <tr>
            <th>Bulk Uploads List</th>
          </tr>
        </thead>

        <tbody>
          {bulkUploads?.map((item) => (
              <tr key={item._id} className="table-row">
                <td >
                  <div className="record-details">
                    <div>Records Processed: {item.recordsProcessed}</div>
                    <div>Errors: {item.totalErrors}</div>
                    <div>Time Taken: {item.timeTaken}</div>
                    <div>
                      Uploaded At: {new Date(item.createdAt).toLocaleString()}
                    </div>
                    <div>Session Id: {item.session_id}</div>
                  </div>
                  <div className="view-errors">
                    <button
                      onClick={() =>
                        handleViewBulkUploadErrors(item.session_id)
                      }
                    >
                      <FaEye className="action-icon" />
                      View Errors
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BulkUploadList;
