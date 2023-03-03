import React from 'react';
import { useHistory } from 'react-router';
import '../App.css';

function Profile() {
  // const user = JSON.parse(localStorage.getItem('user')); //não tenho acesso ainda
  const history = useHistory();

  return (
    <div className="profile-main-div">
      <h2>PROFILE</h2>
      <h3 data-testid="profile-email">email</h3>
      <button
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }

      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ () => history.push('/') }

      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
