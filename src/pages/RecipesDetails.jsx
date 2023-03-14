import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BtnRecipesDetails from '../componentes/BtnRecipesDetails';
import BtnShareAndFavorite from '../componentes/BtnShareAndFavorite';
import { detailsRecipesApi } from '../services/api';
import RecomendationCard from '../componentes/RecomendationCard';

import './RecipesDetails.css';

function RecipesDetails() {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [AllChecked, setAllChecked] = useState(false);

  const carousel = useRef(null);

  const { pathname } = useLocation();
  //* Destructuring pathname
  const [recipeType, id] = pathname.split('/').splice(1);

  const api = useCallback(async () => {
    const recipeURL = recipeType === 'meals'
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

    const result = await detailsRecipesApi(recipeURL);
    setRecipe(result[recipeType]);

    const ingredientsArray = Object
      .entries(result[recipeType][0])
      .filter((e) => e[0]
        .includes('strIngredient') && e[1] !== '' && e[1] !== null)
      .map((e) => e[1]);
    setIngredients(ingredientsArray);

    const measureArray = Object
      .entries(result[recipeType][0])
      .filter((e) => e[0]
        .includes('strMeasure') && e[1] !== '' && e[1] !== null)
      .map((e) => e[1]);
    setMeasure(measureArray);
  }, [recipeType, id]);

  const handlePrev = () => {
    const element = carousel.current;
    const itemWidth = element.children[0].offsetWidth; // largura do primeiro item
    const currentScroll = element.scrollLeft;
    const maxScroll = element.scrollWidth - element.offsetWidth;
    const nextScroll = Math.max(currentScroll - itemWidth, 0);
    element.scrollLeft = nextScroll === 0 ? maxScroll : nextScroll;
  };

  const handleNext = () => {
    const marginAndBorder = 15;
    const element = carousel.current;
    const itemWidth = element.children[0].offsetWidth + marginAndBorder; // largura do primeiro item
    const currentScroll = element.scrollLeft;
    const maxScroll = element.scrollWidth - element.offsetWidth;
    const nextScroll = Math.min(currentScroll + itemWidth, maxScroll);
    element.scrollLeft = nextScroll === maxScroll ? 0 : nextScroll;
  };

  useEffect(() => {
    api();
    setAllChecked(false);
  }, [api]);

  return (
    <div>
      <BtnShareAndFavorite
        recipe={ recipe }
        recipeType={ recipeType }
        id={ id }
        favoriteId="favorite-btn"
        shareId="share-btn"
      />
      {recipeType === 'meals' ? (
        recipe
          .map((
            { idMeal, strMealThumb, strMeal, strCategory, strInstructions, strYoutube },
          ) => (
            <main className="flex flex-col items-center" key={ idMeal }>
              <div className="w-screen h-64 overflow-hidden">
                <h2
                  className="text-white font-bold text-4xl flex items-center decoration
                  absolute z-40 h-10 w-48 inset-x-28 inset-y-24 justify-center"
                  data-testid="recipe-title"
                >
                  {strMeal}
                </h2>
                <img
                  className="w-screen relative brightness-75"
                  data-testid="recipe-photo"
                  src={ strMealThumb }
                  alt={ strMeal }
                />
                <h3 data-testid="recipe-category">{strCategory}</h3>
              </div>
              <div className="my-8 w-11/12">
                <h2 className="ml-4 text-2xl font-semibold">Ingredients</h2>
                <ul
                  className="text-xl list-disc list-inside
                  w-full p-4 my-3 border-2 rounded-lg"
                >
                  {ingredients.map((ingredient, idx) => (
                    <li
                      className="my-5"
                      key={ idx }
                      data-testid={ `${idx}-ingredient-name-and-measure` }
                    >
                      {ingredient}
                      {' '}
                      {measure[idx]}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-11/12 mb-8">
                <h2 className="ml-4 text-2xl font-semibold">Instructions</h2>
                <p
                  className="text-xl w-full p-6 my-3 border-2 rounded-lg"
                  data-testid="instructions"
                >
                  {strInstructions}
                </p>
              </div>
              <div className="w-11/12 mb-8">
                <h2 className="ml-4 mb-2 text-2xl font-semibold">Video</h2>
                <iframe
                  className="w-full h-72"
                  data-testid="video"
                  src={ `https://www.youtube.com/embed/${strYoutube.split('v=')[1]}` }
                  allow="accelerometer; autoplay; clipboard-write;
                  encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
              <section
                className="d-flex carousel"
                data-testid="carsl-t"
                ref={ carousel }
                name="carousel"
              >
                <RecomendationCard thumb={ 16 } />
              </section>
              <div className="d-flex btnNext mb-14">
                <button onClick={ handlePrev }>Prev</button>
                <button onClick={ handleNext }>Next</button>
              </div>
              <BtnRecipesDetails
                idRecipe={ idMeal }
                type="meals"
                ingredients={ ingredients }
                AllChecked={ AllChecked }
                recipeFull={ recipe }
              />
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
                { strAlcoholic}
              </h3>
              <ul>
                {ingredients.map((ingredient, idx) => (
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
              <br />
              <div
                className="d-flex carousel"
                data-testid="carsl-t"
                ref={ carousel }
              >
                <RecomendationCard thumb={ 6 } />
              </div>
              <div className="d-flex btnNext">
                <button onClick={ handlePrev }>Prev</button>
                <button onClick={ handleNext }>Next</button>
              </div>
              <BtnRecipesDetails
                idRecipe={ idDrink }
                type="drinks"
                ingredients={ ingredients }
                AllChecked={ AllChecked }
                recipeFull={ recipe }
              />
            </main>
          ))
      )}
    </div>
  );
}

export default RecipesDetails;
