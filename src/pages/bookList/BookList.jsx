import axios from '../../axiosConfig'
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookListItem from "../../components/bookListItem/BookListItem";
import Pagination from "../../components/pagination/Pagination";
import Sort from "../../components/sort/Sort";
import { FaFilter } from "react-icons/fa";
import Filter from "../../components/filter/Filter";
import ErrorPage from '../errorPage/ErrorPage';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  const [errors, setErrors] = useState("");

  const location = useLocation();


  const fetchApiResponse = useCallback(async () => {
    try {
      const apiResponse = await axios.get(
        `http://localhost:5000/api/search${location.search}`
      );
      setBooks(apiResponse.data.books);
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrors(error.message);
    } finally {
      setLoading(false);
    }
  }, [location.search]);


  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  useEffect(() => {
    fetchApiResponse();
  }, [location.search]);


  if (loading) {
    return <h2 style={{ margin: "400px" }}>Loading...</h2>
  }

  if (errors) {
    return <ErrorPage errorMessage={errors} />
  }

  return (
    <div>
      <div style={{ marginLeft: "200px" }}>
        <table>
          <thead>
            <Sort />
            <button
              style={{
                position: "relative",
                top: "-43px",
                right: "-1500px",
                backgroundColor: "#7c7c7c",
              }}
              onClick={toggleFilter}
            >
              <FaFilter /> Filters
            </button>

            {filterOpen && <Filter />}
          </thead>

          <tbody >

            {books?.map((item, index) => (
              <tr key={index} >
                <td role="book-list-item" >
                  <BookListItem item={item} />
                </td>
              </tr>
            ))}

          </tbody>
          <Pagination />
          <tfoot>

          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default BookList;
