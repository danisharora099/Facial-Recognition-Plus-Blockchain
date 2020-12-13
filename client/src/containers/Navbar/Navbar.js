import React from "react";
import Logo from "../../assets/Logo.svg";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header>
      <div>
        <img src={Logo} alt="header" className="logo" />
        <span>FaceCollege</span>
      </div>
      <div className="navb-left">
        <div className="navb-links">
          <span
            className="nav-link"
            onClick={() => {
              window.open("https://medium.com/huddle-01", "_blank");
            }}
          >
            Add Users
          </span>
          <span className="nav-link" onClick={() => console.log("clicked")}>
            About Us
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
