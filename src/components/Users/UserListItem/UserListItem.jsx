import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserListItem = ({ user: { login, avatar_url } }) => {
  return (
    <section className="card">
      <main className="card-content center-align">
        <Link to={`/users/${login}`}>
          <img
            className="circle responsive-img"
            style={{ width: 64 }}
            src={avatar_url}
            alt={login + " avatar"}
          />
          <p>{login}</p>
        </Link>
      </main>
      <footer className="card-action center-align">
        <Link to={`/users/${login}`} className="btn btn-primary btn-block">
          more
        </Link>
      </footer>
    </section>
  );
};

UserListItem.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired
  })
};

export default UserListItem;
