import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import BtnDneRecipes from '../componentes/BtnDneRecipes';
import Header from '../componentes/Header';
import ShareImage from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  // const [meals, setmeals] = useState([]);
  // const [drinks, setdrinks] = useState([]);

  const shareRecipe = (recipeType, id) => {
    copy(`http://localhost:3000/${recipeType}/${id}`);

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
    setDoneRecipes(getDoneRecipes());
  }, []);

  return (
    <main>
      <Header />
      <BtnDneRecipes />
      <div>
        {doneRecipes.map((recipe, index) => {
          console.log(recipe.image);
          return (
            <div key={ index }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.Image }
                alt={ recipe.name }
              />
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.type === 'meal'
                  ? `${recipe.area} - ${recipe.category}` : recipe.alcoholicOrNot}
              </p>
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
              <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => shareRecipe(`${recipe.type}s`, recipe.id) }
              >
                <img src={ ShareImage } alt="Share Recipe" />
              </button>
              <p data-testid={ `${index}-horizontal-tags` }>{recipe.tags}</p>
            </div>
          );
        })}

      </div>
    </main>
  );
}

export default DoneRecipes;
