import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "../Navbar";
import About from "../Pages/About";
import Home from "../Pages/Home/Home";
import UserDetailPage from "../Pages/UserDetail/UserDetailPage";

import GithubState from "../../context/github/state";
import NotFound from "../Pages/NotFound/NotFound";

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
  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />

          <main className="container" style={styles.posRelative}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route
                path="/users/:login"
                render={props => <UserDetailPage {...props} />}
              />
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
