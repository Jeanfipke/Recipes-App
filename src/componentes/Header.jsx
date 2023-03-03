import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import recipesLogo from '../images/recipesLogo.svg';
import recipesTextLogo from '../images/recipesTextLogo.svg';
import SearchBar from './SearchBar';

function Header() {
  const { pathname } = useLocation();
  const history = useHistory();
  const [toSearch, setToSearch] = useState('invisible');

  return (
    <header className="header">
      <div className="header-top">
        <div className="recipes-logo">
          <img src={ recipesLogo } alt="recipes icon" />
          <img src={ recipesTextLogo } alt="recipes text icon" />
        </div>
        <div className="header-buttons">
          <button
            onClick={ () => setToSearch(
              toSearch === 'invisible' ? 'visible' : 'invisible',
            ) }
          >
            <img src={ searchIcon } alt="search icon" />
          </button>
          <button onClick={ () => history.push('/profile') }>
            <img src={ profileIcon } alt="profile icon" />
          </button>
        </div>
      </div>
      <h1>{ pathname.toUpperCase().split('/') }</h1>
      {
        toSearch === 'invisible'
          ? (
            <p />
          ) : (
            <SearchBar />
          )
      }
    </header>
  );
}

export default Header;
