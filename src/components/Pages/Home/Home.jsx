import React, { Fragment, useContext } from "react";
import GithubContext from "../../../context/github/context";

import Alert from "../../Alert";
import SearchBar from "../../SearchBar";
import UserList from "../../Users/UserList";

const Home = () => {
  const githubContext = useContext(GithubContext);

  const userList = githubContext.userList;
  const isFetching = userList.isFetching;

  const alertData = githubContext.alert;
  const hideAlert = githubContext.hideAlert;

  return (
    <Fragment>
      {alertData !== null && <Alert hideAlert={hideAlert} alert={alertData} />}
      <SearchBar />
      {!(isFetching === false && userList === 0) ? (
        <UserList userList={userList} />
      ) : null}
    </Fragment>
  );
};
export default Home;
