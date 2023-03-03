import React from 'react';
import { useHistory } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import recipesLogo from '../images/recipesLogo.svg';
import recipesTextLogo from '../images/recipesTextLogo.svg';

function Header() {
  const history = useHistory();

  return (
    <header className="header">
      <div className="header-top">
        <div className="recipes-logo">
          <img src={ recipesLogo } alt="recipes icon" />
          <img src={ recipesTextLogo } alt="recipes text icon" />
        </div>
        <div className="header-buttons">
          <button>
            <img src={ searchIcon } alt="search icon" />
          </button>
          <button onClick={ () => history.push('/profile') }>
            <img src={ profileIcon } alt="profile icon" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
