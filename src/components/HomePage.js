import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ user, handleLogout }) => {
  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      {user && (
        <div>
          <p>You are logged in as {user.username}.</p>
          <p>Name: {user.firstname} {user.lastname}</p>
          <p>Email: {user.email}</p>
          <p>Mobile Number: {user.mobilenumber}</p>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
      <br />
      <br />
      <Link to="/register">Register</Link>
    </div>
  );
};

export default HomePage;
