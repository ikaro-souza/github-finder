import React, { useState } from "react";
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

const SearchBar = ({ isShowingUsers, searchUsers, clearUsers, setAlert }) => {
  const [userName, setUserName] = useState("");

  const handleChange = event => setUserName(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();

    if (userName === "") {
      setAlert("You need to insert a username", "error");
      return;
    }

    searchUsers(userName);
    setUserName("");
  };

  const handleClearUsers = () => clearUsers();

  return (
    <section aria-label="Search bar" className="container" style={styles.mb2}>
      <form
        className="row"
        onSubmit={handleSubmit}
        action={null}
        style={styles.mb0}
      >
        <div className="input-field col s12">
          <i className="material-icons prefix">search</i>
          <input
            className="validate"
            type="text"
            name="userName"
            id="userName"
            placeholder="Search for users..."
            value={userName}
            onChange={handleChange}
          />
        </div>
        <div className="input-field col s12">
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
      {isShowingUsers && (
        <div className="row">
          <div className="col s12">
            <button
              className="btn grey"
              style={styles.btnBlock}
              onClick={handleClearUsers}
            >
              <i className="material-icons left">close</i>
              Clear
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

SearchBar.propTypes = {
  isShowingUsers: PropTypes.bool.isRequired,
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default SearchBar;
