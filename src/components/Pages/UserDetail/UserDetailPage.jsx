import React, { Fragment, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import Loader from "../../Loader/Loader";
import ReposList from "../../Repos/ReposList";
import GithubContext from "../../../context/github/context";

const UserDetailPage = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const getRepos = githubContext.getRepos;
  const getUser = githubContext.getUser;
  const { message } = githubContext.user.data;
  const {
    avatar_url,
    bio,
    company,
    followers,
    hireable,
    html_url,
    location,
    login,
    public_repos
  } = githubContext.user.data;
  const isFetching = githubContext.user.isFetching;

  useEffect(() => {
    const { login } = match.params;
    getUser(login);
    getRepos(login);
    //eslint-disable-next-line
  }, []);

  if (!message) {
    return isFetching ? (
      <div className="row">
        <div className="col">
          <Loader />
        </div>
      </div>
    ) : (
      <Fragment>
        <section className="row">
          <div className="col s12 card center-align">
            <div className="card-content">
              <header>
                <a href={html_url}>
                  <img
                    src={avatar_url}
                    alt={login}
                    className="circle responsive-img"
                    style={{ width: 256 }}
                  />
                </a>
                <h4>{login}</h4>
                {bio && <h6>{bio}</h6>}
                <br />
                <div className="divider"></div>
                <br />
              </header>
              <main>
                {company && (
                  <p>
                    <strong>Company:&nbsp;</strong> {company}
                  </p>
                )}
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <strong>Hireable:&nbsp;</strong>
                  {hireable ? (
                    <i className="material-icons green-text">check</i>
                  ) : (
                    <i className="material-icons red-text">close</i>
                  )}
                </p>
                {location && (
                  <p>
                    <strong>Location:</strong> {location}
                  </p>
                )}
                <p>
                  <strong>Repositories:</strong> {public_repos}
                </p>
                <p>
                  <strong>Followers:</strong> {followers}
                </p>
              </main>
            </div>
            <footer className="card-action">
              <a href={html_url} className="btn">
                Visit {login}'s Github page
              </a>
            </footer>
          </div>
        </section>
        <section className="row">
          <ReposList repos={githubContext.repos.repos} />
        </section>
      </Fragment>
    );
  } else {
    return <Redirect to="" />;
  }
};

UserDetailPage.propTypes = {
  match: PropTypes.object.isRequired
};

export default UserDetailPage;
