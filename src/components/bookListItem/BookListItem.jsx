import React, { useState } from "react";
import "./BookListItem.css";
import { Outlet, useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import axios from '../../axiosConfig';

const BookListItem = ({ item }) => {
  const navigate = useNavigate();

  const [showPopUp, setShowPopUp] = useState(false);

  const handleView = () => {
    navigate(`/book/${item._id}`);
  };

  const handleEdit = () => {
    navigate(`/add-book/${item._id}`);
  };

  const handleDelete = async () => {
    setShowPopUp(true);
  };

  const deleteOk = async () => {
    const apiResponse = await axios.delete(`http://localhost:5000/api/books/${item._id}`);
    setShowPopUp(false);
    window.location.reload();
  };

  const deleteCancel = () => {
    setShowPopUp(false);
  };

  return (
    <>
      <div className="book-list-item">
        <div className="book-details">
          <img
            src={item.coverImage}
            alt={`${item.title} cover`}
            className="book-cover"
          />

          <div className="book-info">
            <h3>{item.title}</h3>
            <p>Author: {item.author.name}</p>
            <p>Price: ${item.price}</p>
            <p>Rating: {item.rating}/5</p>
          </div>
        </div>

        <div className="book-actions">
          <button className="action-button" aria-label="view" onClick={handleView}>
            <FaEye className="action-icon" />
          </button>
          <button className="action-button" aria-label="edit" onClick={handleEdit}>
            <FaEdit className="action-icon" />
          </button>
          <button className="action-button" aria-label="delete" onClick={handleDelete}>
            <FaTrash className="action-icon" />
          </button>

          {showPopUp ? (
            <div className="deletion-popup">
              <p>Are you sure to delete this item?</p>
              <button onClick={deleteOk}>Yes</button>
              <button onClick={deleteCancel}>Cancel</button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default BookListItem;
