import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const { searchUsers, clearUsers, users } = githubContext;
  const { setAlert } = alertContext;

  const [text, setText] = useState('');
  const onChange = e => setText(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    if (!text) {
      setAlert('Please enter something', 'light');
    } else {
      searchUsers(text);
      setText('');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          onChange={onChange}
          value={text}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {users.length > 0 && (
        <button onClick={clearUsers} className="btn btn-light btn-block">
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
