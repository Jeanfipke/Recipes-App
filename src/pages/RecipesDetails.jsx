import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BtnRecipesDetails from '../componentes/BtnRecipesDetails';
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

      <div>
        <button
          data-testid="share-btn"
          onClick={ () => shareRecipe() }
        >
          Compartilhar
        </button>
        <button
          data-testid="favorite-btn"
          onClick={ () => favoriteRecipe() }
        >
          Favoritar
        </button>
      </div>

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
                {ingredients.map((ingredient, idx) => (
                  <li
                    key={ idx }
                    data-testid={ `${idx}-ingredient-name-and-measure` }
                  >
                    {ingredient}
                    {' '}
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
              <div className="d-flex carousel" ref={ carousel }>
                <RecomendationCard thumb={ 16 } />
              </div>
              <div className="d-flex btnNext">
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
              <div className="d-flex carousel" ref={ carousel }>
                <RecomendationCard thumb={ 6 } />
              </div>
              <div className="d-flex">
                <button className="" onClick={ handlePrev }>Prev</button>
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
