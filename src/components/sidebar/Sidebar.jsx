import React from 'react';
import './Sidebar.css'; 
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const handleLogout = ()=>{
    localStorage.removeItem("AUTH-TOKEN");
  }
  return (
    <aside className="left-sidebar">
      <nav>
        <ul>
          <li><NavLink to={ '/' } >Book List</NavLink></li>
          <li><NavLink to={ '/add-book' }>Add Book</NavLink></li>
          <li><NavLink to={ '/upload-file' }>Upload File</NavLink></li>
          <li><NavLink to={ '/bulk-uploads' }>Bulk Uploads</NavLink></li>
          <li><NavLink to={'/login'} onClick={handleLogout}>Logout</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;