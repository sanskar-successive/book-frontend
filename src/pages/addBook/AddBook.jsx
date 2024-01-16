import React, { useEffect, useState } from "react";
import "./AddBook.css";
import { useParams } from "react-router-dom";
import axios from '../../axiosConfig'
import { transformFormData } from "../../helpers/tranformFormData";

const categories = [
  "fiction",
  "mystery",
  "arts",
  "science",
  "romance",
  "horror",
  "religion",
  "philosophy",
  "history",
  "poetry",
  "biography",
  "technology",
];

const languages = ["english", "hindi", "sanskrit", "telugu", "bengali"];

const AddBook = () => {
  const initialiseBookData = {
    title: "",
    coverImage: "",
    category: "",
    author: {
      name: "",
      about: "",
    },
    rating: 0,
    price: 0,
    moreDetails: {
      text_language: "",
      publisher: "",
      firstPublished: Date.now(),
      seller: "",
      description: "",
      fileSize: 0,
      pages: 0,
      edition: 1,
      verified: false,
    },
  };

  const { bookId } = useParams();
  console.log(bookId);

  let initialLoading = false;
  if (bookId) initialLoading = true;

  const [bookData, setBookData] = useState(initialiseBookData);
  const [loading, setLoading] = useState(initialLoading);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const formDataJson = transformFormData(Object.fromEntries(formData.entries()));
    console.log("formJson", formDataJson);

    addBook(formDataJson);
  };

  const [errors, setErrors] = useState("");

  const fetchBookData = async () => {
    try {
      const apiResponse = await axios.get(
        `http://localhost:5000/api/books/${bookId}`
      );
      setBookData({ ...apiResponse.data.book });
    } catch (error) {
      console.error("Error fetching book data:", error);
      setErrors(error.message)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchBookData();
    }
  }, [bookId]);

  const addBook = async (formDataJson) => {
    try {
      let apiResponse;
      if (!bookId) {

        apiResponse = await axios.post(
          "http://localhost:5000/api/books",
          formDataJson
        );

      }
      else {
        apiResponse = await axios.patch(
          `http://localhost:5000/api/books/${bookId}`,
          formDataJson
        );
      }
      console.log(apiResponse.data.book);
    } catch (error) {
      console.log(error.message);
      setErrors(error.message)
    }
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (errors) {
    return <h3>some error occured</h3>
  }

  return (
    <div className="add-book-container">
      <h2>Add Book</h2>

      <form className="add-book-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            maxLength={50}
            defaultValue={bookData.title}
            type="text"
            id="title"
            name="title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="moreDetails.description"
            rows="8"
            maxLength={500}
            placeholder="Enter a brief description"
            defaultValue={bookData.moreDetails.description}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            defaultValue={bookData.category}
          >
            {categories.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            name="moreDetails.language"
            defaultValue={bookData.moreDetails.language}
          >
            {languages.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={bookData.price}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            readOnly
            defaultValue={bookData.rating}
            type="number"
            id="rating"
            name="rating"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fileSize">File Size</label>
          <input
            readOnly
            type="number"
            id="fileSize"
            name="moreDetails.fileSize"
            defaultValue={bookData.moreDetails.fileSize}
          />
        </div>

        <div className="form-group">
          <label htmlFor="pages">Page Count</label>
          <input
            readOnly
            type="number"
            id="pages"
            name="moreDetails.pages"
            defaultValue={bookData.moreDetails.pages}
          />
        </div>

        <div className="form-group">
          <label htmlFor="authorName">Author</label>
          <input
            maxLength={50}
            type="text"
            id="authorName"
            name="author.name"
            defaultValue={bookData.author.name}
          />
        </div>

        <div className="form-group">
          <label htmlFor="aboutAuthor">About Author</label>
          <textarea
            id="aboutAuthor"
            name="author.about"
            rows="5"
            maxLength={100}
            placeholder="Tell us about the author"
            defaultValue={bookData.author.about}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="seller">Seller</label>
          <input
            maxLength={50}
            type="text"
            id="seller"
            name="moreDetails.seller"
            defaultValue={bookData.moreDetails.seller}
          />
        </div>

        <div className="form-group">
          <label htmlFor="publisher">Publisher</label>
          <input
            maxLength={50}
            type="text"
            id="publisher"
            name="moreDetails.publisher"
            defaultValue={bookData.moreDetails.publisher}
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstPublished">First Published</label>
          <input
            type="date"
            id="firstPublished"
            name="moreDetails.firstPublished"
            defaultValue={bookData.moreDetails.firstPublished}
          />
        </div>

        <div className="form-group">
          <label htmlFor="verified">Verified</label>
          <input
            type="checkbox"
            id="verified"
            name="moreDetails.verified"
            defaultChecked={bookData.moreDetails.verified}
          />
        </div>

        <div className="form-group">
          <label htmlFor="edition">Edition</label>
          <input
            type="number"
            id="edition"
            name="moreDetails.edition"
            defaultValue={bookData.moreDetails.edition}
          />
        </div>

        <div className="form-group">
          <label htmlFor="coverImage">Cover Image</label>
          <input
            type="text"
            id="coverImage"
            name="coverImage"
            defaultValue={bookData.coverImage}
          />
        </div>

        <button type="submit" className="add-book-button">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
