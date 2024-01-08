import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import "./Pagination.css";

const Pagination = ({ total = 100 }) => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(total / limit);

  const location = useLocation();
  const [queryParams, setQueryParams] = useSearchParams(location.search);

  const handlePageButtonClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const limitOptions = [10, 20, 50];

  const skip = (currentPage - 1) * limit;

  useEffect(() => {
    console.log(currentPage);
    if (currentPage !== 1) {
      if (queryParams.has("skip")) {
        queryParams.delete("skip");
        queryParams.set("skip", skip);
      } else {
        queryParams.set("skip", skip);
      }
    } else {
      queryParams.delete("skip");
    }

    if (limit !== 10) {
      if (queryParams.has("limit")) {
        queryParams.delete("limit");
        queryParams.set("limit", limit);
      } else {
        queryParams.set("limit", limit);
      }
    } else {
      queryParams.delete("limit");
    }

    setQueryParams(queryParams);
  }, [currentPage]);

  return (
    <div className="PaginationContainer">
      <select
        className="PaginationSelect"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      >
        {limitOptions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {currentPage > 1 && currentPage <= totalPages ? (
        <button
          className="PaginationButton"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          prev
        </button>
      ) : null}

      {totalPages > 0 &&
        [...Array(totalPages)].map((_, index) => (
          <button
            role="page-change-button"
            key={index}
            className={`PaginationButton ${
              currentPage === index + 1 ? "ActiveButton" : ""
            }`}
            onClick={() => handlePageButtonClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}

      {currentPage >= 1 && currentPage < totalPages ? (
        <button
          className="PaginationButton"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          next
        </button>
      ) : null}
    </div>
  );
};
export default Pagination;
