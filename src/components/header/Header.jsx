import React from "react";
import "./Header.css";
import Search from "../search/Search";

const Header = () => {
  return (
    <header role="header" className="sticky-header">
      <div className="header-content">
        <div>
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
