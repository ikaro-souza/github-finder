import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Loader from "../../Loader/Loader";

class UserDetailPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    user: PropTypes.shape({
      isFetching: PropTypes.bool.isRequired,
      data: PropTypes.object.isRequired
    }).isRequired
  };

  componentDidMount() {
    const login = this.props.match.params.login;
    this.props.getUser(login);
  }

  render() {
    const { data, isFetching } = this.props.user;
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
    } = data;

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
      </Fragment>
    );
  }
}
export default UserDetailPage;
