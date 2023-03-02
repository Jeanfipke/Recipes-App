import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Profile() {
  // const user = JSON.parse(localStorage.getItem('user')); //não tenho acesso ainda

  return (
    <div className="profile-main-div">
      <h2>PROFILE</h2>
      <h3 data-testid="profile-email">email</h3>
      <Link
        to="/done-recipes"
        data-testid="profile-done-btn"
      >
        Done recipes
      </Link>
      <Link
        to="/favorite-recipes"
        data-testid="profile-favorite-btn"
      >
        Favorite recipes
      </Link>
      <Link
        to="/"
        data-testid="profile-logout-btn"
      >
        Logout
      </Link>
    </div>
  );
}

export default Profile;
