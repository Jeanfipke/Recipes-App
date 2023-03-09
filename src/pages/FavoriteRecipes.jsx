import React, { useState } from 'react';
import BtnShareAndFavorite from '../componentes/BtnShareAndFavorite';
import Header from '../componentes/Header';

const mock = [
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    doneDate: 'teste',
    tags: '',
  },
  {
    id: '17222',
    type: 'drink',
    nationality: '',
    alcoholicOrNot: 'Alcoholic',
    name: 'A1',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    doneDate: 'teste',
    tags: '',
  },
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    doneDate: 'teste',
    tags: 'Soup',
  },
  {
    id: '53060',
    type: 'meal',
    nationality: 'Croatian',
    alcoholicOrNot: '',
    name: 'Burek',
    image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    doneDate: 'teste',
    tags: 'Streetfood, Onthego',
  },
];

function FavoriteRecipes() {
  const [test, setTest] = useState(mock);
  const [initial] = useState(mock);

  // todo O elemento de favoritar a receita deve ter o atributo `data-testid="${index}-horizontal-favorite-btn"`;

  const filterAll = () => {
    setTest(initial);
  };

  const filterMeals = () => {
    const teste = [...initial];
    const filtered = teste.filter(({ type }) => type === 'meal');
    setTest(filtered);
  };

  const filterDrinks = () => {
    const teste = [...initial];
    const filtered = teste.filter(({ type }) => type === 'drink');
    setTest(filtered);
  };

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
              // ! 'doneRecipes'
              test.map(({
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
