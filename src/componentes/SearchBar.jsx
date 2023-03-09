import React, { useState } from 'react';

function SearchBar() {
  const [filters, setFilters] = useState('');
  const [search, setSearch] = useState('');
  const FIRST_LETTER = 'First letter';
  const INGREDIENT = 'Ingredient';
  const NAME = 'Name';

  // const ingredientAPI = https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}
  // const nameAPI = https://www.themealdb.com/api/json/v1/1/search.php?s={nome}
  // const firstLetterAPI = https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}

  const handleChangeRadios = ({ target: { value } }) => {
    if (value === FIRST_LETTER && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    setFilters(value);
  };

  const handleChangeSearch = ({ target: { value } }) => {
    if (filters === FIRST_LETTER && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    setSearch(value);
  };

  const switchURL = () => {
    switch (filters) {
    case INGREDIENT:

      return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;

    case NAME:

      return `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;

    case FIRST_LETTER:

      return `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
    default:
      break;
    }
  };

  const handleClick = async () => {
    const url = await switchURL();
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  };

  return (
    <form>
      <label htmlFor="search">
        <input
          id="search"
          data-testid="search-input"
          type="text"
          placeholder="Search"
          value={ search }
          onChange={ (e) => handleChangeSearch(e) }
        />
      </label>
      <section>
        <label>
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            value="Ingredient"
            name="searchFilter"
            onChange={ (e) => handleChangeRadios(e) }
          />
          Ingredient
        </label>
        <label>
          <input
            data-testid="name-search-radio"
            type="radio"
            value="Name"
            name="searchFilter"
            onChange={ (e) => handleChangeRadios(e) }
          />
          Name
        </label>
        <label>
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            value="First letter"
            name="searchFilter"
            onChange={ (e) => handleChangeRadios(e) }
          />
          First letter
        </label>
      </section>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleClick() }
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
