import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SearchBar() {
  const [filters, setFilters] = useState('');
  const [search, setSearch] = useState('');
  const history = useHistory();
  const FIRST_LETTER = 'First letter';
  const INGREDIENT = 'Ingredient';
  const NAME = 'Name';

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

  const mealsURL = () => {
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

  const drinksURL = () => {
    switch (filters) {
    case INGREDIENT:

      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;

    case NAME:

      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;

    case FIRST_LETTER:

      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
    default:
      break;
    }
  };

  const handleClick = async () => {
    if (history.location.pathname === '/meals') {
      try {
        const url = mealsURL();
        const response = await fetch(url);
        const datas = await response.json();
        if (datas.meals.length === 1) {
          history.push(`/meals/${datas.meals[0].idMeal}`);
        }
      } catch (error) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        console.log(error);
      }
    } else {
      try {
        const url = drinksURL();
        const response = await fetch(url);
        const datas = await response.json();
        if (datas.drinks.length === 1) {
          history.push(`/drinks/${datas.drinks[0].idDrink}`);
        }
      } catch (error) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        console.log(error);
      }
    }
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
