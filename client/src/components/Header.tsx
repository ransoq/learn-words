import React from "react";

import "./header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </header>
  );
};

export default Header;
