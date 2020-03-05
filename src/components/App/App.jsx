import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "../Navbar";
import About from "../Pages/About";
import Home from "../Pages/Home/Home";

const styles = {
  posRelative: {
    position: "relative"
  },
  alertWarning: {
    backgroundColor: "yellow",
    color: "black"
  }
};

class App extends Component {
  state = {
    alert: null,
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
    const baseUrl = this.getApiRequestUrl("search/users");
    const url = baseUrl + "&q=" + userName;

    this.setState(state => ({
      ...state,
      userList: { ...state.userList, isFetching: true }
    }));

    const result = await axios.get(url);

    this.setState(state => ({
      ...state,
      alert: null,
      userList: {
        isFetching: false,
        users: result.data.items
      }
    }));
  };

  clearUsers = () => this.setState(state => ({
    userList: {
      ...state.userList,
      users: []
    }}));

  setAlert = (message, type) => {
    this.setState(state => ({
      ...state,
      alert: {
        message,
        type
      }
    }));
  };

  hideAlert = () => this.setState(state => ({ ...state, alert: null }));

  render() {
    const {isFetching, users} = this.state.userList;
    const {alert} = this.state;

    const homePageProps = {
      users: {
        isFetching,
        userList: users,
        searchUsers: this.searchUsers,
        clearUsers: this.clearUsers,
      },
      alert: {
        alertData: alert,
        setAlert: this.setAlert,
        hideAlert: this.hideAlert
      }
    };

    return (
      <Router>
        <div className="App">
          <Navbar />

          <main className="container" style={styles.posRelative}>
            <Switch>
              <Route exact path="/">
                <Home users={homePageProps.users} alert={homePageProps.alert} />
              </Route>
              <Route path="/about" >
                <About/>
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
