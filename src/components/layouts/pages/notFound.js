import React from 'react';
import notFoundImage from '../notFoundImage.jpg';

const notFound = () => {
  return (
    <div className="text-center">
      <img
        src={notFoundImage}
        alt=""
        role="presentation"
        style={{ maxWidth: '350px', margin: 'auto', display: 'block' }}
      />
      <h2>Not Found</h2>
      <h3>The page you are looking for does not exist...</h3>
    </div>
  );
};

export default notFound;
