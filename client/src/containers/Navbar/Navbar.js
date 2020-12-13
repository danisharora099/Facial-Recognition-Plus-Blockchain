import React from "react";
import Logo from "../../assets/Logo.svg";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header>
      <div className="nav-logo">
        <img src={Logo} alt="header" className="logo" />
        <span>FaceCollege</span>
      </div>
      <div className="navb-left">
        <div className="navb-links">
          <span className="nav-link">Add Users</span>
          <span className="nav-link" onClick={() => console.log("clicked")}>
            Database
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
