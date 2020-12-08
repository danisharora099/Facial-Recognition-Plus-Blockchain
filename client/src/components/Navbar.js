import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-info">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0 text-white"
          
          target="_blank"
          rel="noopener noreferrer"
        >
          College
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <li className="text-white">Your Account Address: <span id="account">{this.props.account}</span></li>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
