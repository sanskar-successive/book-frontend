import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import "./BulkUploadList.css";

const BulkUploadList = () => {
  const [bulkUploads, setBulkUploads] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const handleViewBulkUploadErrors = (session_id) => {
    navigate(`/bulk-uploads/${session_id}`);
  };

  const fetchApiResponse = async () => {

    try {
      const apiResponse = await axios.get(
        `http://localhost:5000/api/bulk-uploads-list`
      );
      if (Array.isArray(apiResponse.data)) {
        setBulkUploads(apiResponse.data);
      } else {
        console.error("Invalid data format:", apiResponse.data);
      }
    } catch (error) {
      console.log("some error in fetching bulk upoload details", error);
    }
    finally{
      setLoading(false);
    }
    
  };

  useEffect(() => {
    fetchApiResponse();
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
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
          {bulkUploads.length === 0
            ? "kuch nhi hai"
            : bulkUploads?.map((item) => (
                <tr key={item._id} className="table-row">
                  <td role="record-details">
                    <div  className="record-details">
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
