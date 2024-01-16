import React, { useEffect, useState } from "react";
import "./BookDetails.css";
import axios from "../../axiosConfig";
import { useParams } from "react-router-dom";
import ErrorPage from "../errorPage/ErrorPage";

const initialBookDetails = {
  title: "No data available",
  coverImage: "No data available",
  category: "No data available",
  author: {
    name: "No data available",
    about: "No data available",
  },
  rating: 0,
  price: 0,
  moreDetails: {
    publisher: "No data available",
    firstPublished: new Date("1925-04-10"),
    seller: "No data available",
    text_language: "No data available",
    description:"No data available",
    fileSize: 0,
    pages: 0,
    verified: false,
    edition: 1,
  },
};

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(initialBookDetails);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("")

  const fetchBookData = async () => {
    try {
      const apiResponse = await axios.get(
        `http://localhost:5000/api/books/${bookId}`
      );
      setBook(apiResponse.data.book);
    } catch (error) {
      setErrors(error.message)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookData();
  }, [bookId]);

  if (loading) return <h2>Loading</h2>;

  if(errors){
    return <ErrorPage errorMessage={errors} />
  }

  return (
    <div className="book-details-container">
      <img
        src={book.coverImage}
        alt={`${book.title} cover`}
        className="book-cover"
      />
      <table className="book-table">
        <tbody>
          <tr>
            <td>Title</td>
            <td>{book.title}</td>
          </tr>
          <tr>
            <td>Category</td>
            <td>{book.category}</td>
          </tr>
          <tr>
            <td>Author</td>
            <td>{book.author.name}</td>
          </tr>
          <tr>
            <td>Rating</td>
            <td>{book.rating}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>${book.price}</td>
          </tr>
          <tr>
            <td>Language</td>
            <td>{book.moreDetails.text_language}</td>
          </tr>
          <tr>
            <td>Publisher</td>
            <td>{book.moreDetails.publisher}</td>
          </tr>
          <tr>
            <td>First Published</td>
            <td>
              {new Date(book.moreDetails.firstPublished).toLocaleDateString()}
            </td>
          </tr>

          <tr>
            <td>Description</td>
            <td>{book.moreDetails.description}</td>
          </tr>

          <tr>
            <td>Pages</td>
            <td>{book.moreDetails.pages}</td>
          </tr>

          <tr>
            <td>File Size</td>
            <td>{book.moreDetails.fileSize}</td>
          </tr>

          <tr>
            <td>Edition</td>
            <td>{book.moreDetails.edition}</td>
          </tr>

          <tr>
            <td>Verified</td>
            <td>{book.moreDetails.verified.toString()}</td>
          </tr>

          <tr>
            <td>Cover Image URL</td>
            <td>{book.coverImage}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookDetails;
