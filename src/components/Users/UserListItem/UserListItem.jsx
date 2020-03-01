import React from "react";
import PropTypes from "prop-types";

const UserListItem = ({ user: { login, avatar_url, html_url } }) => {
  return (
    <section className="card">
      <main className="card-content center-align">
        <a href={html_url}>
          <img
            className="circle responsive-img"
            style={{ width: 64 }}
            src={avatar_url}
            alt={login + " avatar"}
          />
          <p>{login}</p>
        </a>
      </main>
      <footer className="card-action center-align">
        <a href={html_url} className="btn btn-primary btn-block">
          more
        </a>
      </footer>
    </section>
  );
};

UserListItem.propTypes = {
  user: PropTypes.shape({
      login: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
      html_url: PropTypes.string.isRequired
  }),
};

export default UserListItem;
