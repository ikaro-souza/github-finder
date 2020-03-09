import React from "react";
import PropTypes from "prop-types";

import RepoListItem from "../RepoListItem";

const ReposList = ({ repos }) => {
  return (
    <section className="row border">
      {repos.map(repo => (
        <RepoListItem repo={repo} key={repo.id} />
      ))}
    </section>
  );
};

ReposList.propTypes = {
  repos: PropTypes.array.isRequired
};

export default ReposList;
