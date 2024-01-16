import React, { memo, useReducer } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import "./Filter.css";

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

const Filter = () => {
  const location = useLocation();

  const [queryParams, setQueryParams] = useSearchParams(location.search);

  const handleFilters = () => {
    console.log(location);

    console.log(Object.entries(state));

    Object.entries(state).forEach((item) => {
      if (item[0] === "price") {
        if (item[1].from > 50) {
          if (queryParams.has("price.from")) {
            queryParams.delete("price.from");
          }
          queryParams.set("price.from", item[1].from);
        } else {
          queryParams.delete("price.from");
        }
        if (item[1].to < 2000) {
          if (queryParams.has("price.to")) {
            queryParams.delete("price.to");
          }
          queryParams.set("price.to", item[1].to);
        } else {
          queryParams.delete("price.to");
        }
      } else if (item[0] === "rating") {
        if (queryParams.has(item[0])) {
          queryParams.delete(item[0]);
        }
        Object.keys(item[1]).forEach((key) => {
          if (item[1][key] === true) {
            queryParams.set(item[0], key);
          }
        });
      } else {
        if (queryParams.has(item[0])) {
          queryParams.delete(item[0]);
        }
        Object.keys(item[1]).forEach((key) => {
          if (item[1][key] === true) {
            queryParams.append(item[0], key);
          }
        });
      }
    });

    console.log(state);

    setQueryParams(queryParams);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    dispatch({ field: "price", item: name, value: value });
  };

  const handleRatingChange = (e) => {
    const { name, checked } = e.target;
    dispatch({ field: "rating", item: name, isSelected: checked });
  };

  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    dispatch({ field: "category", item: name, isSelected: checked });
  };

  const handleLanguageChange = (e) => {
    const { name, checked } = e.target;
    dispatch({ field: "language", item: name, isSelected: checked });
  };

  const reducer = (state, action) => {
    if (action.field === "price") {
      return {
        ...state,
        price: { ...state.price, [action.item]: action.value },
      };
    } else {
      return {
        ...state,
        [action.field]: {
          ...state[[action.field]],
          [action.item]: action.isSelected,
        },
      };
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    price: { from: 50, to: 2000 },
    rating: { aboveThree: false, aboveFour: false },
    category: {
      fiction: false,
      mystery: false,
      arts: false,
      science: false,
      romance: false,
      horror: false,
      religion: false,
      philosophy: false,
      history: false,
      poetry: false,
      biography: false,
      technology: false,
    },
    language: {
      english: false,
      hindi: false,
      sanskrit: false,
      telugu: false,
      bengali: false,
    },
  });

  return (
    <div className="filterContainer">
      <div>
        <p className="filterTitle">Price</p>
        <input
          className="filterInput"
          value={state.price.from}
          onChange={handlePriceChange}
          name="from"
          type="number"
          placeholder="Min"
        />
        <input
          className="filterInput"
          value={state.price.to}
          onChange={handlePriceChange}
          name="to"
          type="number"
          placeholder="Max"
        />
      </div>
      <div>
        <p className="filterTitle">Rating</p>
        <label>
          3 and above
          <input
            className="filterCheckbox"
            checked={state.rating.aboveThree}
            onChange={handleRatingChange}
            name="aboveThree"
            type="checkbox"
          />
        </label>
        <label>
          4 and above
          <input
            className="filterCheckbox"
            checked={state.rating.aboveFour}
            onChange={handleRatingChange}
            name="aboveFour"
            type="checkbox"
          />
        </label>
      </div>
      <div>
        <p className="filterTitle">Category</p>
        {categories.map((item) => (
          <label key={item} htmlFor={item} className="filterLabel">
            {item}
            <input
              role="category-checkbox"
              className="filterCheckbox"
              checked={state.category[item]}
              onChange={handleCategoryChange}
              name={item}
              type="checkbox"
            />
          </label>
        ))}
      </div>
      <div>
        <p className="filterTitle">Language</p>
        {languages.map((item) => (
          <label key={item} htmlFor={item} className="filterLabel">
            {item}
            <input
              role="language-checkbox"
              className="filterCheckbox"
              checked={state.language[item]}
              onChange={handleLanguageChange}
              name={item}
              type="checkbox"
            />
          </label>
        ))}
      </div>
      <button className="filterButton" onClick={handleFilters}>
        Apply
      </button>
    </div>
  );
};

export default memo(Filter);
