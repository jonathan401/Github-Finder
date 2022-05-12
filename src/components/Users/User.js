import React, { Fragment, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layouts/Spinner';
import Error from '../layouts/Error';
import Repos from '../repos/Repos';

import GithubContext from '../../context/github/githubContext';

const User = ({ getUserRepo, match }) => {
  const githubContext = useContext(GithubContext);
  const { getUser, user, loading, error, getUserRepos, repos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    company,
    blog,
    bio,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable
  } = user;

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return (
      <Fragment>
        <Link to="/" className="btn btn-light">
          <i className="fa fa-arrow-left" style={{ marginRight: '0.4rem' }} />{' '}
          Back to Search
        </Link>
        <Error />
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        <i className="fa fa-arrow-left" style={{ marginRight: '0.4rem' }} />{' '}
        Back to Search
      </Link>
      Hireable:{' '}
      {hireable ? (
        <i className="fa fa-check text-success" />
      ) : (
        <i className="fa fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            alt={name}
            className="round-img"
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website: </strong> {blog}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong> {company}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;
