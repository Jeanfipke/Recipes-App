import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import Swal from 'sweetalert2';
import ShareImage from '../images/shareIcon.svg';
import UnfavoriteImage from '../images/whiteHeartIcon.svg';
import FavoriteImage from '../images/blackHeartIcon.svg';

function BtnShareAndFavorite({ recipe, recipeType, id }) {
  console.log(recipeType, id);
  const [isFavorite, setIsFavorite] = useState(false);
  const shareRecipe = () => {
    copy(`http://localhost:3000/${recipeType}/${id}`);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Link copied!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const favoriteRecipe = () => {
    const prevStorage = JSON
      .parse(localStorage.getItem('favoriteRecipes') || '[]');

    if (prevStorage.some((prevId) => prevId.id === id)) {
      const favoriteRemoved = prevStorage.filter((prevId) => prevId.id !== id);
      localStorage
        .setItem('favoriteRecipes', JSON.stringify(favoriteRemoved));
      setIsFavorite(false);
      return null;
    }

    if (recipeType === 'meals') {
      const { idMeal, strArea, strCategory, strMeal, strMealThumb } = recipe[0];
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...prevStorage, {
          id: idMeal,
          type: 'meal',
          nationality: strArea || '',
          category: strCategory || '',
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        }]));
      setIsFavorite(true);
    } else {
      const { idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb } = recipe[0];
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...prevStorage, {
          id: idDrink,
          type: 'drink',
          nationality: '',
          category: strCategory || '',
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb,
        }]));
      setIsFavorite(true);
    }
  };

  const checkIsFavorite = useCallback(() => {
    const prevStorage = JSON
      .parse(localStorage.getItem('favoriteRecipes') || '[]');

    const favoriteResult = prevStorage.some((prevId) => prevId.id === id);
    setIsFavorite(favoriteResult);
  }, [id]);

  useEffect(() => {
    checkIsFavorite();
  }, [checkIsFavorite]);

  return (
    <div>
      <button
        data-testid="share-btn"
        onClick={ shareRecipe }
      >
        <img src={ ShareImage } alt="Share Recipe" />
      </button>
      <button
        // data-testid="favorite-btn"
        onClick={ favoriteRecipe }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? FavoriteImage : UnfavoriteImage }
          alt="Favorite Recipe"
        />
      </button>
    </div>
  );
}

BtnShareAndFavorite.propTypes = {
  recipe: PropTypes.shape({}).isRequired,
  recipeType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default BtnShareAndFavorite;
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import Swal from 'sweetalert2';
import ShareImage from '../images/shareIcon.svg';
import UnfavoriteImage from '../images/whiteHeartIcon.svg';
import FavoriteImage from '../images/blackHeartIcon.svg';

function BtnShareAndFavorite({ recipe, recipeType, id }) {
  console.log(recipeType, id);
  const [isFavorite, setIsFavorite] = useState(false);
  const shareRecipe = () => {
    copy(`http://localhost:3000/${recipeType}/${id}`);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Link copied!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const favoriteRecipe = () => {
    const prevStorage = JSON
      .parse(localStorage.getItem('favoriteRecipes') || '[]');

    if (prevStorage.some((prevId) => prevId.id === id)) {
      const favoriteRemoved = prevStorage.filter((prevId) => prevId.id !== id);
      localStorage
        .setItem('favoriteRecipes', JSON.stringify(favoriteRemoved));
      setIsFavorite(false);
      return null;
    }

    if (recipeType === 'meals') {
      const { idMeal, strArea, strCategory, strMeal, strMealThumb } = recipe[0];
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...prevStorage, {
          id: idMeal,
          type: 'meal',
          nationality: strArea || '',
          category: strCategory || '',
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        }]));
      setIsFavorite(true);
    } else {
      const { idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb } = recipe[0];
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...prevStorage, {
          id: idDrink,
          type: 'drink',
          nationality: '',
          category: strCategory || '',
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb,
        }]));
      setIsFavorite(true);
    }
  };

  const checkIsFavorite = useCallback(() => {
    const prevStorage = JSON
      .parse(localStorage.getItem('favoriteRecipes') || '[]');

    const favoriteResult = prevStorage.some((prevId) => prevId.id === id);
    setIsFavorite(favoriteResult);
  }, [id]);

  useEffect(() => {
    checkIsFavorite();
  }, [checkIsFavorite]);

  return (
    <div>
      <button
        data-testid="share-btn"
        onClick={ shareRecipe }
      >
        <img src={ ShareImage } alt="Share Recipe" />
      </button>
      <button
        // data-testid="favorite-btn"
        onClick={ favoriteRecipe }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? FavoriteImage : UnfavoriteImage }
          alt="Favorite Recipe"
        />
      </button>
    </div>
  );
}

BtnShareAndFavorite.propTypes = {
  recipe: PropTypes.shape({}).isRequired,
  recipeType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default BtnShareAndFavorite;
