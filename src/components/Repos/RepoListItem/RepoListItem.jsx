import React from "react";
import PropTypes from "prop-types";

const RepoListItem = ({ repo }) => {
  return (
    <section className="col s12 m6 l6 center-align">
      <div className="card">
        <div className="card-content">
          <a href={repo.html_url}>{repo.name}</a>
        </div>
      </div>
    </section>
  );
};

RepoListItem.propTypes = {
  repo: PropTypes.object.isRequired
};

export default RepoListItem;
