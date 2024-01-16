import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header data-testid="top-header" />
      <Sidebar data-testid="left-sidebar"  />
      <Outlet data-testid="outlet" />
    </div>
  );
};

export default Layout;
