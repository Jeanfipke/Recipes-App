import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../componentes/Footer';

import BtnCategories from '../componentes/BtnCategories';
import Card from '../componentes/Card';
import { STOP_ARRAY_RECIPES } from '../Helpers/genericConsts';
import { recipeAPI } from '../services/api';
import { selectedCategory } from '../redux/Actions';
import Header from '../componentes/Header';

function Recipes() {
  const { pathname } = useLocation();
  const category = useSelector((state) => state.categories);
  /* console.log('category', category); */

  const [recipe, setRecipe] = useState([]);

  const dispatch = useDispatch();

  const typeRicepe = pathname.split('/')[1];

  const api = useCallback(async () => {
    try {
      let URL_RECIPE = pathname === '/meals'
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.category}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category.category}`;
      if (!category.category) {
        URL_RECIPE = pathname === '/meals'
          ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
          : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      }
      const results = await recipeAPI(URL_RECIPE);
      if (results[typeRicepe]?.length > STOP_ARRAY_RECIPES) {
        const resultsRecipe = results[typeRicepe].slice(0, STOP_ARRAY_RECIPES);
        return setRecipe(resultsRecipe);
      }
      const resultsRecipe = results[typeRicepe];
      return setRecipe(resultsRecipe);
    } catch (error) {
      console.error(error);
    }
  }, [category.category, pathname, typeRicepe]);

  const handleResetFilters = () => {
    dispatch(selectedCategory(''));
  };

  useEffect(() => {
    api();
  }, [api]);

  return (
    <div>
      <Header />
      <BtnCategories />
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleResetFilters }
      >
        All
      </button>
      {pathname === '/meals' ? (
        recipe
          .map((meal, idx) => (
            <Link to={ `/meals/${meal.idMeal}` } key={ meal.idMeal }>
              <Card key={ meal.idMeal } param={ meal } idx={ idx } />
            </Link>
          ))
      ) : (
        recipe
          .map((drink, idx) => (
            <Link to={ `/drinks/${drink.idDrink}` } key={ drink.idDrink }>
              <Card key={ drink.idDrink } param={ drink } idx={ idx } />
            </Link>
          ))
      )}
      <Footer />
    </div>
  );
}

export default Recipes;
