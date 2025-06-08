import React from 'react';

const ErrorMessage = ({ error }) => (
  <div
    role="alert"
    className="text-center text-red-600 bg-red-100 border border-red-400 p-4 rounded m-4"
  >
    <p>Error: {error}</p>
    <p>Please try again later.</p>
  </div>
);

export default ErrorMessage;
