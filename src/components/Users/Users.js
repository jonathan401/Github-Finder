import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layouts/Spinner';
import Error from '../layouts/Error';
import GithubContext from '../../context/github/githubContext';

const Users = () => {
  const githubContext = useContext(GithubContext);
  const { loading, users, error } = githubContext;
  if (loading) {
    return <Spinner />;
  }

  if (error && !users.length) {
    return <Error />;
  }

  return (
    <div style={userStyles}>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

const userStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gridGap: '1rem'
};

export default Users;
