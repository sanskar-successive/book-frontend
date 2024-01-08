import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";

const Layout = () => {
  return (
    <div>
      <Header data-testid="top-header" />
      <Sidebar data-testid="left-sidebar"  />
    </div>
  );
};

export default Layout;
