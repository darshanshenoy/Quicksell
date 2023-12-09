import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="dropdown">
        <button className="dropbtn" onClick={toggleDropdown}>
          Sorting Options
        </button>
        {isOpen && (
          <div className="dropdown-content">
            <Link to="/sorted-by-priority" onClick={toggleDropdown}>Sort by Priority</Link>
            <Link to="/sorted-by-status" onClick={toggleDropdown}>Sort by Status</Link>
            <Link to="/sort-by-user" onClick={toggleDropdown}>Sort by User</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
