import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { STOP_ARRAY_RECOMENDATION } from '../Helpers/genericConsts';
import { detailsRecipesApi, recipeAPI } from '../services/api';

function RecipesDetails() {
  const [recipe, setRecipe] = useState([]);
  const [recomendations, setRecomendation] = useState([]);
  const [indredients, setIndredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [carousel, setCarousel] = useState(0);
  const { pathname } = useLocation();
  //* Destructuring pathname
  const [recipeType, id] = pathname.split('/').splice(1);

  const recomendationType = recipeType === 'meals'
    ? 'Drinks' : 'Meals';

  const api = useCallback(async () => {
    const recipeURL = recipeType === 'meals'
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

    const recomendationURL = recipeType === 'meals'
      ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
      : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    const resultRecomendation = await recipeAPI(recomendationURL);
    setRecomendation(resultRecomendation[recomendationType.toLocaleLowerCase()]
      .splice(0, STOP_ARRAY_RECOMENDATION));

    const result = await detailsRecipesApi(recipeURL);
    setRecipe(result[recipeType]);

    const ingredientsArray = Object
      .entries(result[recipeType][0])
      .filter((e) => e[0]
        .includes('strIngredient') && e[1] !== '' && e[1] !== null)
      .map((e) => e[1]);
    setIndredients(ingredientsArray);

    const measureArray = Object
      .entries(result[recipeType][0])
      .filter((e) => e[0]
        .includes('strMeasure') && e[1] !== '' && e[1] !== null)
      .map((e) => e[1]);
    setMeasure(measureArray);
  }, [recipeType, id, recomendationType]);

  // console.log(recomendations.length);

  const handlePrev = () => {
    setCarousel((prev) => (prev - 2 < 0 ? recomendations.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCarousel((prev) => (prev + 2 >= recomendations.length ? 0 : prev + 1));
  };

  useEffect(() => {
    api();
  }, [api, setCarousel]);

  return (
    <div>
      {recipeType === 'meals' ? (
        recipe
          .map((
            { idMeal, strMealThumb, strMeal, strCategory, strInstructions, strYoutube },
          ) => (
            <main key={ idMeal }>
              <h2 data-testid="recipe-title">{strMeal}</h2>
              <img
                data-testid="recipe-photo"
                src={ strMealThumb }
                alt={ strMeal }
              />
              <h3 data-testid="recipe-category">{strCategory}</h3>
              <ul>
                {indredients.map((ingredient, idx) => (
                  <li
                    key={ idx }
                    data-testid={ `${idx}-ingredient-name-and-measure` }
                  >
                    {ingredient}
                    {measure[idx]}
                  </li>
                ))}
              </ul>
              <p data-testid="instructions">{strInstructions}</p>
              <iframe
                data-testid="video"
                width="853"
                height="480"
                src={ `https://www.youtube.com/embed/${strYoutube.split('v=')[1]}` }
                allow="accelerometer; autoplay; clipboard-write;
          encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
              <button onClick={ handlePrev }>Prev</button>
              <div>
                {recomendations.slice(carousel, carousel + 2)
                  .map((recomendation, index) => {
                    console.log(carousel);
                    return (
                      <div
                        key={ index }
                        data-testid={ `${index}-recommendation-card` }
                        className="w-1/2"
                      >
                        <h2 data-testid={ `${index}-recommendation-title` }>
                          {Object.entries(recomendation)[1][1]}
                        </h2>
                      </div>
                    );
                  })}
              </div>
              <button onClick={ handleNext }>Next</button>
            </main>
          ))
      ) : (
        recipe
          .map((
            { idDrink,
              strDrink,
              strDrinkThumb,
              strCategory,
              strInstructions,
              strAlcoholic,
            },
          ) => (
            <main key={ idDrink }>
              <h2 data-testid="recipe-title">{strDrink}</h2>
              <img
                data-testid="recipe-photo"
                src={ strDrinkThumb }
                alt={ strDrink }
              />
              <h3 data-testid="recipe-category">
                {strCategory}
                {' '}
                { strAlcoholic !== 'Non alcoholic' && strAlcoholic}
              </h3>
              <ul>
                {indredients.map((ingredient, idx) => (
                  <li
                    key={ idx }
                    data-testid={ `${idx}-ingredient-name-and-measure` }
                  >
                    {ingredient}
                    {measure[idx]}
                  </li>
                ))}
              </ul>
              <p data-testid="instructions">{strInstructions}</p>
            </main>
          ))
      )}
    </div>
  );
}

export default RecipesDetails;
