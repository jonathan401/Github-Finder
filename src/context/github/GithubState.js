import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
  SET_ERROR
} from '../types';

// env
let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

// setting the state
const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);
  // action creators

  // search users
  const searchUsers = async text => {
    setLoading();
    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${text}
        &client_id=${githubClientId}
        &client_secret=${githubClientSecret}`
      );
      const users = [...res.data.items];
      dispatch({
        type: SEARCH_USERS,
        payload: users
      });
    } catch (error) {
      setError(error.message);
    }
  };
  // get user
  const getUser = async username => {
    setLoading();
    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}
            ?client_id=${githubClientId}
            &client_secret=${githubClientSecret}`
      );
      const user = res.data;
      dispatch({ type: GET_USER, payload: user });
    } catch (err) {
      setError(err.message);
    }
  };

  // get repos
  const getUserRepos = async username => {
    setLoading();
    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&created&direction=asc&client_id=${githubClientId}
          &client_secret=${githubClientSecret}`
      );
      const repos = res.data;
      dispatch({ type: GET_REPOS, payload: repos });
    } catch (err) {
      setError(err.message);
    }
  };

  // clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // set error
  const setError = error => dispatch({ type: SET_ERROR, payload: error });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        error: state.error,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}>
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
