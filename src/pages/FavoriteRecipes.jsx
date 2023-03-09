import React, { useCallback, useEffect, useState } from 'react';
import BtnShareAndFavorite from '../componentes/BtnShareAndFavorite';
import Header from '../componentes/Header';

function FavoriteRecipes() {
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [initial, setInitial] = useState([]);

  const filterAll = () => {
    setFilteredFoods(initial);
  };

  const filterMeals = () => {
    const initialArr = [...initial];
    const filtered = initialArr.filter(({ type }) => type === 'meal');
    setFilteredFoods(filtered);
  };

  const filterDrinks = () => {
    const initialArr = [...initial];
    const filtered = initialArr.filter(({ type }) => type === 'drink');
    setFilteredFoods(filtered);
  };

  const checkIsFavorite = useCallback(() => {
    const prevStorage = JSON
      .parse(localStorage.getItem('favoriteRecipes'));
    setFilteredFoods(prevStorage);
    setInitial(prevStorage);
  }, []);

  useEffect(() => {
    checkIsFavorite();
  }, [checkIsFavorite]);

  return (
    <>
      <Header />
      <main>
        <div>
          <button
            data-testid="filter-by-all-btn"
            onClick={ filterAll }
          >
            All
          </button>

          <button
            data-testid="filter-by-meal-btn"
            onClick={ filterMeals }
          >
            Meals
          </button>

          <button
            data-testid="filter-by-drink-btn"
            onClick={ filterDrinks }
          >
            Drinks
          </button>
          <div>
            {
              filteredFoods.map(({
                id,
                type,
                nationality,
                category,
                alcoholicOrNot,
                name,
                image,
              }, index) => (
                <div key={ index }>
                  <img
                    src={ image }
                    alt={ name }
                    data-testid={ `${index}-horizontal-image` }
                  />
                  <h2 data-testid={ `${index}-horizontal-top-text` }>
                    {category}
                    {' '}
                    {nationality || alcoholicOrNot}
                  </h2>
                  <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
                  <BtnShareAndFavorite
                    recipe={
                      [{
                        [type === 'meal' ? 'idMeal' : 'idDrink']: id,
                        nationality,
                        category,
                        alcoholicOrNot,
                        [type === 'meal' ? 'strMeal' : 'strDrink']: name,
                        [type === 'meal' ? 'strMealThumb' : 'strDrinkThumb']: image,
                      }]
                    }
                    recipeType={ `${type}s` }
                    id={ id }
                    favoriteId={ `${index}-horizontal-favorite-btn` }
                  />
                </div>
              ))
            }
          </div>
        </div>
      </main>
    </>
  );
}

export default FavoriteRecipes;
