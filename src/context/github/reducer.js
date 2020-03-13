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

const githubReducer = (state, action) => {
  let newState = { ...state };
  const { payload, type } = action;

  switch (type) {
    case SEARCH_USERS:
      newState = {
        ...newState,
        userList: { users: payload.users, isFetching: false }
      };
      break;

    case SET_USERS_IS_FETCHING:
      newState = { ...newState, userList: { users: [], isFetching: true } };
      break;

    case CLEAR_USERS:
      newState = { ...newState, userList: { users: [], isFetching: false } };
      break;

    case GET_USER:
      newState = {
        ...newState,
        user: { data: payload.data, isFetching: false }
      };
      break;

    case SET_USER_IS_FETCHING:
      newState = { ...newState, user: { data: {}, isFetching: true } };
      break;

    case GET_REPOS:
      newState = {
        ...newState,
        repos: { repos: payload.repos, isFetching: false }
      };
      break;

    case SET_REPOS_IS_FETCHING:
      newState = { ...newState, repos: { repos: [], isFetching: true } };
      break;

    case SET_ALERT:
      newState = {
        ...newState,
        alert: { message: payload.message, type: payload.type }
      };
      break;

    case HIDE_ALERT:
      newState = { ...newState, alert: null };
      break;

    default:
      break;
  }

  return newState;
};

export default githubReducer;
