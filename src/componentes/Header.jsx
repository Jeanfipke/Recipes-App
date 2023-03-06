import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import recipesLogo from '../images/recipesLogo.svg';
import recipesTextLogo from '../images/recipesTextLogo.svg';
import SearchBar from './SearchBar';
import HeaderTitle from './HeaderTitle';

function Header() {
  const { pathname } = useLocation();
  const history = useHistory();
  const [toSearch, setToSearch] = useState('invisible');
  const prohibitedPaths = '/profile /done-recipes /favorite-recipes';

  return (
    <header className="header">
      <div className="header-top">
        <div className="recipes-logo">
          <img src={ recipesLogo } alt="recipes icon" />
          <img src={ recipesTextLogo } alt="recipes text icon" />
        </div>
        <div className="header-buttons">
          {
            prohibitedPaths.includes(pathname)
              ? (
                ''
              ) : (
                <button
                  onClick={ () => setToSearch(
                    toSearch === 'invisible' ? 'visible' : 'invisible',
                  ) }
                >
                  <img
                    src={ searchIcon }
                    alt="search icon"
                    data-testid="search-top-btn"
                  />
                </button>
              )
          }
          <button onClick={ () => history.push('/profile') }>
            <img
              src={ profileIcon }
              alt="profile icon"
              data-testid="profile-top-btn"
            />
          </button>
        </div>
      </div>
      <HeaderTitle />
      {
        toSearch === 'invisible'
          ? (
            ''
          ) : (
            <SearchBar />
          )
      }
    </header>
  );
}

export default Header;
