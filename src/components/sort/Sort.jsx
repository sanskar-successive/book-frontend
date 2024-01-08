import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import './Sort.css'

const sortOptions = [
  "newest",
  "title",
  "price low to high",
  "price high to low",
  "popularity",
];

const Sort = () => {
  const [sortBy, setSortBy] = useState("newest");
  const location = useLocation();

  const [queryParams, setQueryParams] = useSearchParams(location.search);

  console.log(queryParams.toString());

  const handleSortBy = (e) => {
    console.log(location);
    setSortBy(e.target.value);
  };

  useEffect(() => {
    console.log(sortBy);
    if (sortBy !== "newest") {
      if (queryParams.has("sortBy")) {
        queryParams.delete("sortBy");
        queryParams.set("sortBy", sortBy);
      } else {
        queryParams.set("sortBy", sortBy);
      }
    } else {
      queryParams.delete("sortBy");
    }
    setQueryParams(queryParams);
  }, [sortBy]);

  // return (
  //   <div>

  //     {sortOptions.map((item) => {
  //       return (
  //         <button key={item} value={item} onClick={handleSortBy}>
  //           {item}
  //         </button>
  //       );
  //     })}

  //     {sortBy}
  //   </div>
  // );

  return (
    <div className="sortContainer">
      <span className="sortLabel">Sort By:</span>
      <div className="sortOptions">
        {sortOptions.map((item) => (
          <button
            key={item}
            className={`sortButton ${sortBy === item ? "active" : ""}`}
            value={item}
            onClick={handleSortBy}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sort;
