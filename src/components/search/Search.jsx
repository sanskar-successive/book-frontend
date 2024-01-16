import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Search.css"; 
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [searchString, setSearchString] = useState("");
  const [queryParams, setQueryParams] = useSearchParams();

  const handleSearchString = (e) => {
    const { value } = e.target;
    value.trim();
    setSearchString(value);
  };

  const queryKeys = [];
  queryParams.forEach((value, key, parent) => {
    queryKeys.push(key);
  });

  const handleSearch = async () => {
    if (searchString.trim().length) {

      for(let i=0;i<queryKeys.length;i++){
        queryParams.delete(queryKeys[i]);
      }
      queryParams.set("search", searchString);
      setQueryParams(queryParams);
    }
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        name="searchString"
        placeholder="Search..."
        value={searchString}
        onChange={handleSearchString}
        onMouseEnter={handleSearch}
      />
      <button className="search-button" onClick={handleSearch}>
        <FaSearch className="search-icon" />
      </button>
    </div>
  );
};

export default Search;
