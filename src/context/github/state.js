import React, { useReducer } from "react";
import axios from "axios";

import GithubContext from "./context";
import githubReducer from "./reducer";

import {
  SEARCH_USERS,
  SET_USERS_IS_FETCHING,
  CLEAR_USERS,
  GET_USER,
  SET_USER_IS_FETCHING,
  GET_REPOS,
  SET_REPOS_IS_FETCHING,
  HIDE_ALERT,
  SET_ALERT
} from "../types";

const BASE_URL = "https:/api.github.com/";

const appendApiCredentials = url => {
  return (
    url +
    `?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
            client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  );
};

const getApiRequestUrl = (endPoint = "users") =>
  appendApiCredentials(BASE_URL + endPoint);

const GithubState = props => {
  const initialState = {
    userList: { isFetching: false, users: [] },
    user: { isFetching: false, data: {} },
    repos: { isFetching: false, repos: [] },
    alert: null
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // search users
  const searchUsers = async userName => {
    setUsersIsFetching(true);

    const base = getApiRequestUrl("search/users");
    const url = base + "&q=" + userName;
    const result = await axios.get(url);

    hideAlert();

    dispatch({
      type: SEARCH_USERS,
      payload: { users: result.data.items }
    });
  };

  // set users is fetching
  const setUsersIsFetching = () => dispatch({ type: SET_USERS_IS_FETCHING });

  // clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // get user
  const getUser = async userLogin => {
    setUserIsFetching();

    const url = getApiRequestUrl(`users/${userLogin}`);
    const result = await axios.get(url);

    dispatch({
      type: GET_USER,
      payload: { data: result.data }
    });
  };

  // set user is fetching
  const setUserIsFetching = () => dispatch({ type: SET_USER_IS_FETCHING });

  //get repos
  const getRepos = async userLogin => {
    setReposIsFetching();

    const url = getApiRequestUrl(`users/${userLogin}/repos`);
    const result = await axios.get(url);

    dispatch({ type: GET_REPOS, payload: { repos: result.data } });
  };

  // set repos is fetching
  const setReposIsFetching = () => dispatch({ type: SET_REPOS_IS_FETCHING });

  // set alert data
  const setAlertData = async (message, type) =>
    dispatch({ type: SET_ALERT, payload: { message, type } });

  // hide alert
  const hideAlert = () => dispatch({ type: HIDE_ALERT });

  return (
    <GithubContext.Provider
      value={{
        userList: state.userList,
        user: state.user,
        repos: state.repos,
        alert: state.alert,

        searchUsers,
        getUser,
        clearUsers,
        getRepos,
        setAlertData,
        hideAlert
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
