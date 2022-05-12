import React, { useContext } from 'react';
import errorImage from './errorImage.jpg';
import GithubContext from '../../context/github/githubContext';

const Error = () => {
  const githubContext = useContext(GithubContext);
  const { error } = githubContext;

  return (
    <div>
      {error && (
        <div className="text-center">
          <img
            src={errorImage}
            alt="no internet connection"
            style={{ maxWidth: '350px', margin: 'auto', display: 'block' }}
          />
          <h2>{error}</h2>
          <h3>Please try again</h3>
        </div>
      )}
    </div>
  );
};

export default Error;
