import React from "react";
import { Link } from "react-router-dom";

import styles from "./header.scss";

const Header = () => {
  return (
    <header>
      <div className={styles.header}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </header>
  );
};

export default Header;
