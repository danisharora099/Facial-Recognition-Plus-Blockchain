import React from "react";
import Logo from "../../assets/Logo.svg";
import "./Navbar.css";
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
      <div className="nav-logo">
        <Link to='/'>
        <img src={Logo} alt="header" className="logo" />
        <span>
          FaceCollege
        </span>
        </Link>
      </div>
      <div className="navb-left">
        <div className="navb-links">
          <span
            className="nav-link"
            // onClick={() => {
            //   window.open("https://medium.com/huddle-01", "_blank");
            // }}
          >
            <Link to='/addUser'>Add User</Link>
          </span>
          <span className="nav-link">
            <Link to='/database'>Database</Link>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
