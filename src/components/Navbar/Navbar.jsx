import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const styles = {
  navbar: {
    marginBottom: "3rem"
  }
};

const Navbar = ({ icon, title }) => {
  return (
    <nav className="lime darken-1" style={styles.navbar}>
      <div className="nav-wrapper container">
        <Link to="/" className="brand-logo">
          <i className={icon}/>
          {title}
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  icon: "fab fa-github",
  title: "Github Finder"
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
