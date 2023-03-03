import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { STOP_ARRAY_CATEGORIES } from '../Helpers/genericConsts';
import { SELECTED_CATEGORY } from '../redux/Actions/typeActions';
import { drinksCategoriesApi, mealsCategoriesApi } from '../services/api';

function BtnCategories() {
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const api = async () => {
    const resultMealsCategories = await mealsCategoriesApi();
    setMealsCategories(resultMealsCategories.meals);

    const resultDrinksCategories = await drinksCategoriesApi();
    setDrinksCategories(resultDrinksCategories.drinks);
  };

  const handleClick = ({ target }) => {
    console.log(target.innerText);
    dispatch({ type: SELECTED_CATEGORY, payload: target.innerText });
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
            onClick={ (e) => handleClick(e) }
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
            onClick={ (e) => handleClick(e) }
          >
            { categorie.strCategory }
          </button>
        ),
      )
  );
}

// const mapDispatchToProps = (dispatch) => ({
//   selectedCategory: (payload) => dispatch(selectedCategory(payload)),
// });

export default connect(null)(BtnCategories);
