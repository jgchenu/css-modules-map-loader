import React from "react";
import { Link } from "react-router-dom";
import styles from './style.less';
function Header() {
  return (
    <header className={styles.header}>
      <p><Link to="/">Home</Link></p>
      <p><Link to="/login">Login</Link></p>
    </header>
  );
}

export default Header;
