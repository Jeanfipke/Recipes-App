import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import copy from 'clipboard-copy';
import { connect, useSelector } from 'react-redux';

import BtnDneRecipes from '../componentes/BtnDneRecipes';
import Header from '../componentes/Header';
import ShareImage from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const doneRecipesRedux = useSelector((state) => state.doneRecipesRedux);
  const { doneRecipesFilter } = doneRecipesRedux;

  const shareRecipe = (recipeType, id) => {
    copy(`http://localhost:3000/${recipeType}s/${id}`);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Link copied!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const getDoneRecipes = () => {
    const doneRecipesLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesLocal) {
      return doneRecipesLocal;
    }
    return [];
  };

  useEffect(() => {
    console.log(doneRecipesFilter.length);
    if (doneRecipesFilter.length > 0) {
      setDoneRecipes(doneRecipesFilter);
    } else {
      setDoneRecipes(getDoneRecipes());
    }
  }, [doneRecipesFilter]);

  // console.log(doneRecipes);

  return (
    <main>
      <Header />
      <BtnDneRecipes />
      <div>
        {doneRecipes.map((recipe, index) => {
          console.log(recipe.nationality);
          return (
            <div key={ index }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.type === 'meal'
                  ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot}
              </p>
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
              <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
              <label htmlFor="share">
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ ShareImage }
                  alt="share"
                  onClick={ () => shareRecipe(recipe.type, recipe.id) }
                >
                  <img src={ ShareImage } alt="share" />
                </button>
              </label>

              {recipe.tags.map((tag, indexTag) => (
                <p key={ indexTag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </p>
              )) }
            </div>
          );
        })}

      </div>
    </main>
  );
}

export default connect()(DoneRecipes);
