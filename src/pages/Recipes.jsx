import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../componentes/Card';
import { drinksApi, mealsApi } from '../services/api';

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

  const stopArray = 12;

  return (
    <div>
      {pathname === '/meals' ? (
        meals.slice(0, stopArray)
          .map((meal, idx) => <Card key={ meal.idMeal } param={ meal } idx={ idx } />)
      ) : (
        drinks.slice(0, stopArray)
          .map((drink, idx) => <Card key={ drink.idDrink } param={ drink } idx={ idx } />)
      )}
    </div>
  );
}

export default Recipes;
