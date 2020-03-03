import React, { Component } from "react";

export default class SearchBar extends Component {
  state = {
    userName: ""
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    this.props.searchUsers(this.state.userName);
  };

  render() {
    return (
      <section aria-label="Search bar" className="row container">
        <form onSubmit={this.handleSubmit} action={null}>
          <div className="input-field inline col s6 m9 l9 ">
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
          <div className="input-field inline col s6 m3 l3">
            <input
              className="btn btn-primary"
              type="submit"
              value="Search"
              style={{ margin: 0 }}
            />
          </div>
        </form>
      </section>
    );
  }
}
