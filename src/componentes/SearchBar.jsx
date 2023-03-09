import React from 'react';

function SearchBar() {
  return (
    <form>
      <label htmlFor="search">
        <input id="search" data-testid="search-input" type="text" placeholder="Searc" />
      </label>
      <section>
        <label>
          Ingredient
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            value="Ingredient"
            name="searchFilter"
          />
        </label>
        <label>
          Name
          <input
            data-testid="name-search-radio"
            type="radio"
            value="Name"
            name="searchFilter"
          />
        </label>
        <label>
          First letter
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            value="First letter"
            name="searchFilter"
          />
        </label>
      </section>
      <button type="submit" data-testid="exec-search-btn">Search</button>
    </form>
  );
}

export default SearchBar;
