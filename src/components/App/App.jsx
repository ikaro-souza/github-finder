import React, { Component } from "react";
import axios from "axios";

import Navbar from "../Navbar";
import UserList from "../Users/UserList";
import SearchBar from "../SearchBar";

const styles = {
  position: "relative"
};

class App extends Component {
  state = {
    baseUrl: "https:/api.github.com/",
    userList: {
      isFetching: false,
      users: []
    }
  };

  appendApiCredentials = url => {
    return (
      url +
      `?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
            client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
  };

  getApiRequestUrl = (endPoint = "users") =>
    this.appendApiCredentials(this.state.baseUrl + endPoint);

  searchUsers = async userName => {
    var baseUrl = this.getApiRequestUrl("search/users");
    const url = baseUrl + "&q=" + userName;

    this.setState(state => ({
      userList: { ...state.userList, isFetching: true }
    }));

    const result = await axios.get(url);

    this.setState(state => ({
      userList: {
        ...state.userList,
        isFetching: false,
        users: result.data.items
      }
    }));
  };

  render() {
    return (
      <div className="App">
        <Navbar />

        <main className="container" style={styles}>
          <SearchBar searchUsers={this.searchUsers} />
          <UserList userList={this.state.userList} />
        </main>
      </div>
    );
  }
}

export default App;
