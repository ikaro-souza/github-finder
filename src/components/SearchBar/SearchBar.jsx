import React, { Component } from "react";
import PropTypes from "prop-types";

const styles = {
  btnBlock: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "100%"
  },
  mb0: {
    marginBottom: 0
  },
  mb1: {
    marginBottom: "1rem"
  },
  mb2: {
    marginBottom: "2rem"
  }
};

export default class SearchBar extends Component {
  static propTypes = {
    isShowingUsers: PropTypes.bool.isRequired,
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired
  };

  state = {
    userName: ""
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    this.props.searchUsers(this.state.userName);
  };

  handleClearUsers = () => this.props.clearUsers();

  render() {
    const {isShowingUsers} = this.props;

    return (
      <section aria-label="Search bar" className="container" style={styles.mb2}>
        <form className="row" onSubmit={this.handleSubmit} action={null} style={styles.mb0}>
          <div className="input-field">
            <i className="material-icons prefix">search</i>
            <label htmlFor="userName">Search for users</label>
            <input
              className="validate"
              type="text"
              name="userName"
              id="userName"
              placeholder="Search for users..."
              value={this.state.userName}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <button
              className="btn btn-primary"
              type="submit"
              style={styles.btnBlock}
            >
              <i className="material-icons left">search</i>
              Search
            </button>
          </div>
        </form>
        {isShowingUsers && <div className="row">
            <button className="btn grey" style={styles.btnBlock} onClick={this.handleClearUsers}>
              <i className="material-icons left">close</i>
              Clear
            </button>
          </div>
        }
      </section>
    );
  }
}
