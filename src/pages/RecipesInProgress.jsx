import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BtnRecipesDetails from '../componentes/BtnRecipesDetails';
import Header from '../componentes/Header';
import { detailsRecipesApi } from '../services/api';

function RecipesInProgress() {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [AllChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const { pathname } = useLocation();
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

  const handleCheck = async (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    const storage = await JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredientsListStorage = storage[recipeType][id];
    const newIngredientsList = ingredientsListStorage.map((ingredient) => {
      if (item === Object.keys(ingredient)[0]) {
        return { [item]: isChecked };
      }
      return ingredient;
    });
    const newStorage = {
      ...storage,
      [recipeType]: {
        ...storage[recipeType],
        [id]: newIngredientsList,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));

    setCheckedItems({ ...checkedItems, [item]: isChecked });
  };

  const getStorage = useCallback(() => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storage && storage[recipeType] && storage[recipeType][id]) {
      const ingredientsList = storage[recipeType][id];
      const checkedI = ingredientsList.reduce((acc, ingredient) => {
        const [key, value] = Object.entries(ingredient)[0];
        return { ...acc, [key]: value };
      }, {});
      setCheckedItems(checkedI);
    }
  }, [recipeType, id]);

  const changeAllChecked = useCallback(() => {
    const allChecked = Object.values(checkedItems).every((item) => item !== false);
    if (ingredients.length === Object.keys(checkedItems).length && allChecked) {
      console.log('ENTREI true');
      setAllChecked(allChecked);
    } else {
      setAllChecked(false);
    }
  }, [checkedItems, ingredients]);

  useEffect(() => {
    changeAllChecked();
  }, [checkedItems, changeAllChecked]);

  useEffect(() => {
    api();
    getStorage();
  }, [api, getStorage]);

  return (
    <div>
      <Header />
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
                  <label
                    htmlFor={ `${ingredient}${idx}` }
                    key={ idx }
                    data-testid={ `${idx}-ingredient-step` }
                    className={ checkedItems[ingredient] ? 'line-through' : '' }
                  >
                    <input
                      id={ `${ingredient}${idx}` }
                      name={ `${ingredient}` }
                      type="checkbox"
                      checked={ checkedItems[ingredient] }
                      onChange={ handleCheck }
                    />
                    <li
                      data-testid={ `${idx}-ingredient-name-and-measure` }
                    >
                      {ingredient}
                      {' '}
                      {measure[idx]}
                    </li>
                  </label>
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
                  <label
                    htmlFor={ `${ingredient}${idx}` }
                    key={ idx }
                    data-testid={ `${idx}-ingredient-step` }
                    className={ checkedItems[ingredient] ? 'line-through' : '' }
                  >
                    <input
                      id={ `${ingredient}${idx}` }
                      name={ `${ingredient}` }
                      type="checkbox"
                      checked={ checkedItems[ingredient] }
                      onChange={ handleCheck }
                    />
                    <li
                      data-testid={ `${idx}-ingredient-name-and-measure` }
                    >
                      {ingredient}
                      {measure[idx]}
                    </li>
                  </label>
                ))}
              </ul>
              <p data-testid="instructions">{strInstructions}</p>
              <br />
              <button data-testid="finish-recipe-btn">finish recipe</button>
              <BtnRecipesDetails
                idRecipe={ idDrink }
                type="drinks"
                ingredients={ ingredients }
              />
            </main>
          ))
      )}
    </div>
  );
}

export default RecipesInProgress;
