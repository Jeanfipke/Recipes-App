import React from 'react';
import PropTypes from 'prop-types';

function Card({ param, idx }) {
  return (
    <div data-testid={ `${idx}-recipe-card` }>
      <h2 data-testid={ `${idx}-card-name` }>
        {param.strMeal ? param.strMeal : param.strDrink}
      </h2>
      <img
        src={ param.strMealThumb ? param.strMealThumb : param.strDrinkThumb }
        alt=""
        data-testid={ `${idx}-card-img` }
        style={ { width: '100px' } }
      />

    </div>
  );
}

Card.propTypes = {
  param: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  idx: PropTypes.number.isRequired,
};

export default Card;
