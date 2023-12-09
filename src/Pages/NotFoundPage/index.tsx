import React from 'react';

function NotFoundPage() {
  return (
    <div className="text-center m-20">
      <h1 className="text-6xl font-bold text-gray-800">404 - Sorry!</h1>
      <p className="text-lg text-gray-600">The page you’re looking for cannot be found.</p>
      <a href="/" className="text-blue-500 font-medium mt-4 block">
        Go to Homepage
      </a>
    </div>
  );
}

export default NotFoundPage;
