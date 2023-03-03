import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { STOP_ARRAY_CATEGORIES } from '../Helpers/genericConsts';
import { drinksCategoriesApi, mealsCategoriesApi } from '../services/api';

function BtnCategories() {
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const { pathname } = useLocation();

  const api = async () => {
    const resultMealsCategories = await mealsCategoriesApi();
    setMealsCategories(resultMealsCategories.meals);

    const resultDrinksCategories = await drinksCategoriesApi();
    setDrinksCategories(resultDrinksCategories.drinks);
  };

  useEffect(() => {
    api();
  }, []);

  return pathname === '/meals' ? (
    mealsCategories.slice(0, STOP_ARRAY_CATEGORIES)
      .map(
        (categorie) => (
          <button
            data-testid={ `${categorie.strCategory}-category-filter` }
            key={ categorie.strCategory }
            type="button"
          >
            { categorie.strCategory }
          </button>
        ),
      )
  ) : (
    drinksCategories.slice(0, STOP_ARRAY_CATEGORIES)
      .map(
        (categorie) => (
          <button
            data-testid={ `${categorie.strCategory}-category-filter` }
            key={ categorie.strCategory }
            type="button"
          >
            { categorie.strCategory }
          </button>
        ),
      )
  );
}

export default BtnCategories;
