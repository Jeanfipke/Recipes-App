import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';

function BtnRecipesDetails({ idRecipe, type, ingredients, AllChecked }) {
  console.log(AllChecked);
  const [isFinished, setIsFinished] = useState(false);
  const [startMessage, setStartMessage] = useState(true);
  const history = useHistory();
  const { pathname } = useLocation();
  const progress = pathname.split('/').splice(1);

  const listIngredients = ingredients.map((ingredient) => (
    { [ingredient]: false }
  ));

  const startRecipe = (id, recipe) => {
    const prevStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes') || '{}');
    if (recipe === 'meals') {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({
          drinks: {
            ...prevStorage.drinks || {},
          },
          meals: {
            ...prevStorage.meals,
            [id]: listIngredients,
          },
        }));
    } else {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({
          drinks: {
            ...prevStorage.drinks,
            [id]: listIngredients,
          },
          meals: {
            ...prevStorage.meals || {},
          },
        }));
    }

    setStartMessage(false);
    setIsFinished(false);
    history.push(`/${type}/${idRecipe}/in-progress`);
  };

  const getLocalStorage = useCallback(() => {
    const prevStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (prevStorage !== null) {
      const isInProgress = Object.keys(prevStorage[type]).includes(idRecipe);
      setStartMessage(!isInProgress);
      setIsFinished(!isInProgress);
    }

    //! pegar do localStorage doneRecipes
    //! verificar se a receita está completa
    //! if => startMessage === false && isFinished === true
    //! else => startMessage === true && isFinished === false
  }, [type, idRecipe]);

  useEffect(() => {
    // console.log(AllChecked);
    getLocalStorage();
  }, [getLocalStorage, AllChecked]);

  return (
    <div>
      <button
        style={ { position: 'fixed', bottom: 0, left: 0 } }
        data-testid={ `${progress[2] === 'in-progress' ? 'finish' : 'start'}-recipe-btn` }
        onClick={ () => startRecipe(idRecipe, type) }
        disabled={ AllChecked ? !AllChecked : progress[2] }
      >
        { startMessage ? ('Start Recipe') : (
          <span>
            { isFinished || progress[2] ? 'finish recipe' : 'Continue Recipe' }
          </span>
        )}
      </button>
    </div>
  );
}
// teste
BtnRecipesDetails.propTypes = {
  idRecipe: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BtnRecipesDetails;
