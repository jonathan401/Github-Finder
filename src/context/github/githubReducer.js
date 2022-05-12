import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
  SET_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true, error: null };
    case SEARCH_USERS:
      return { ...state, users: action.payload, loading: false, error: null };
    case CLEAR_USERS:
      return { ...state, users: [], loading: false, error: null };
    case GET_USER:
      return { ...state, user: action.payload, loading: false, error: null };
    case GET_REPOS:
      return { ...state, repos: action.payload, loading: false, error: null };
    case SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
