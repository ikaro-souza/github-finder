import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h3>: "The page you're trying to reach doesn't exist."}</h3>
      <Link to="/" className="btn">
        return to homepage
      </Link>
    </>
  );
};

export default NotFound;
