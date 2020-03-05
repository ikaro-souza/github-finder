import React from "react";
import PropTypes from "prop-types";

const styles = {
  navbar: {
    marginBottom: "3rem"
  }
};

const Navbar = ({ icon, title }) => {
  return (
    <nav className="lime darken-1" style={styles.navbar}>
      <div className="nav-wrapper container">
        <a href="/" className="brand-logo">
          <i className={icon}/>
          {title}
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="/">a</a>
          </li>
          <li>
            <a href="/">b</a>
          </li>
          <li>
            <a href="/">c</a>
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
