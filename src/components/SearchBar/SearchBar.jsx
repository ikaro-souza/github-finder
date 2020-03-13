import React, { useState, useContext } from "react";

import GithubContext from "../../context/github/context";

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

const SearchBar = () => {
  const githubContext = useContext(GithubContext);
  const setAlert = githubContext.setAlertData;
  const isShowingUsers = githubContext.userList.users.length > 0;

  const [userName, setUserName] = useState("");

  const handleChange = event => setUserName(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();

    if (userName === "") {
      setAlert("You need to insert a username", "error");
      return;
    }

    githubContext.searchUsers(userName);
    setUserName("");
  };

  const handleClearUsers = () => githubContext.clearUsers();

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

export default SearchBar;
