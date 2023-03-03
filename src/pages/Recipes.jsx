import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Card from '../componentes/Card';
import BtnCategories from '../componentes/BtnCategories';
import { STOP_ARRAY_RECIPES } from '../Helpers/genericConsts';
import { drinksApi, mealsApi } from '../services/api';
import Header from '../componentes/Header';

function Recipes() {
  const { pathname } = useLocation();
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const api = async () => {
    const resultMeals = await mealsApi();
    setMeals(resultMeals.meals);
    const resultDrinks = await drinksApi();
    setDrinks(resultDrinks.drinks);
  };

  useEffect(() => {
    api();
  }, []);

  return (
    <div>
      <Header />
      <BtnCategories />
      {pathname === '/meals' ? (
        meals.slice(0, STOP_ARRAY_RECIPES)
          .map((meal, idx) => <Card key={ meal.idMeal } param={ meal } idx={ idx } />)
      ) : (
        drinks.slice(0, STOP_ARRAY_RECIPES)
          .map((drink, idx) => <Card key={ drink.idDrink } param={ drink } idx={ idx } />)
      )}
    </div>
  );
}

export default Recipes;
