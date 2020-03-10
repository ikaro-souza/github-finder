import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Alert from "../../Alert";
import SearchBar from "../../SearchBar";
import UserList from "../../Users/UserList";

const Home = ({
  alert: { alertData, setAlert, hideAlert },
  users: { isFetching, userList, searchUsers, clearUsers }
}) => {
  return (
    <Fragment>
      {alertData !== null && <Alert hideAlert={hideAlert} alert={alertData} />}
      <SearchBar
        isShowingUsers={userList.length > 0}
        searchUsers={searchUsers}
        clearUsers={clearUsers}
        setAlert={setAlert}
      />
      {!(isFetching === false && userList === 0) ? (
        <UserList users={userList} isFetching={isFetching} />
      ) : null}
    </Fragment>
  );
};

Home.propTypes = {
  alert: PropTypes.shape({
    alertData: PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.string
    }),
    setAlert: PropTypes.func.isRequired,
    hideAlert: PropTypes.func.isRequired
  }).isRequired,
  users: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    userList: PropTypes.array.isRequired,
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired
  }).isRequired
};

export default Home;
