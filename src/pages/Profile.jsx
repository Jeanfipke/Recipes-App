import React from 'react';
import { useHistory } from 'react-router';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const history = useHistory();
  const { email } = user;
  return (
    <div>
      <Header />
      <h3 data-testid="profile-email">{ email }</h3>
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
        onClick={ () => {
          localStorage.clear('user');
          localStorage.clear('doneRecipes');
          localStorage.clear('favoriteRecipes');
          localStorage.clear('inProgressRecipes');
          history.push('/');
        } }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
