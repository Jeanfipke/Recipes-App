import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Header from '../componentes/Header';
import Card from '../componentes/Card';
import BtnCategories from '../componentes/BtnCategories';
import Footer from '../componentes/Footer';

import { selectedCategory } from '../redux/Actions';
import { ApiCheck } from '../Helpers/functionsExt';

function Recipes() {
  const { pathname } = useLocation();
  const category = useSelector((state) => state.categories);

  const [recipe, setRecipe] = useState([]);

  const dispatch = useDispatch();

  const typeRicepe = pathname.split('/')[1];

  const api = useCallback(async () => {
    const endPoint = category.category;
    const resp = await ApiCheck(pathname, endPoint, typeRicepe);
    return setRecipe(resp);
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
        className="w-full bg-violet-900 text-white h-10 font-bold"
        type="button"
        data-testid="All-category-filter"
        onClick={ handleResetFilters }
      >
        ALL
      </button>

      <div className="flex flex-col justify-center items-center mb-24">
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
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
