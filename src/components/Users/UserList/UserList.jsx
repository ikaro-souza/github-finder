import React from "react";
import PropTypes from "prop-types";

import UserListItem from "../UserListItem";
import Loader from "../../Loader";

const styles = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "1rem"
};

const UserList = ({ userList: { users, isFetching } }) => {
  return isFetching ? (
    <div className="center-align">
      <Loader />
    </div>
  ) : (
    <article className="row" style={styles}>
      {users.map(user => (
        <UserListItem user={user} key={user.id} />
      ))}
    </article>
  );
};

UserList.propTypes = {
  userList: PropTypes.shape({
    users: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired
  })
};

export default UserList;
