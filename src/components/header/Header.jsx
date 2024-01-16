import React from "react";
import "./Header.css";
import Search from "../search/Search";

const Header = () => {
  return (
    <header role="header" className="sticky-header">
      <div className="header-content">
        <div>
          <Search data-testid="search-component" />
        </div>
      </div>
    </header>
  );
};

export default Header;
