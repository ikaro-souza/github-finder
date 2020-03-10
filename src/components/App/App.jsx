import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "../Navbar";
import About from "../Pages/About";
import Home from "../Pages/Home/Home";
import UserDetailPage from "../Pages/UserDetail/UserDetailPage";

const styles = {
  posRelative: {
    position: "relative"
  },
  alertWarning: {
    backgroundColor: "yellow",
    color: "black"
  }
};

const App = () => {
  const [alert, setAlert] = useState(null);
  const [baseUrl] = useState("https:/api.github.com/");
  const [userList, setUserList] = useState({ isFetching: false, users: [] });
  const [user, setUser] = useState({ isFetching: false, data: {} });
  const [repos, setRepos] = useState({ isFetching: false, repos: [] });

  const appendApiCredentials = url => {
    return (
      url +
      `?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
            client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
  };

  const getApiRequestUrl = (endPoint = "users") =>
    appendApiCredentials(baseUrl + endPoint);

  const searchUsers = async userName => {
    const base = getApiRequestUrl("search/users");
    const url = base + "&q=" + userName;

    setUserList({ users: [], isFetching: true });

    const result = await axios.get(url);

    setAlert(null);
    setUserList({
      isFetching: false,
      users: result.data.items
    });
  };

  const clearUsers = () =>
    setUserList({
      isFetching: false,
      users: []
    });

  const getUser = async userLogin => {
    setUser({ data: {}, isFetching: true });

    const url = getApiRequestUrl(`users/${userLogin}`);
    const result = await axios.get(url);

    setUser({
      isFetching: false,
      data: result.data
    });
  };

  const getUserRepos = async userLogin => {
    setRepos({ repos: [], isFetching: true });

    const url = getApiRequestUrl(`users/${userLogin}/repos`);
    const result = await axios.get(url);

    setRepos({
      isFetching: false,
      repos: result.data
    });
  };

  const setAlertData = (message, type) =>
    setAlert({
      message,
      type
    });

  const hideAlert = () => setAlert(null);

  const homePageProps = {
    users: {
      isFetching: userList.isFetching,
      userList: userList.users,
      searchUsers,
      clearUsers
    },
    alert: {
      alertData: alert,
      setAlertData,
      hideAlert
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
            <Route path="/about">
              <About />
            </Route>
            <Route
              path="/users/:login"
              render={props => (
                <UserDetailPage
                  getUser={getUser}
                  user={user}
                  getUserRepos={getUserRepos}
                  repos={repos}
                  {...props}
                />
              )}
            />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
