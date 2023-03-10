<<<<<<< HEAD
import { SELECTED_CATEGORY, UPDATE_FAVORITE } from './typeActions';
=======
import { SELECTED_CATEGORY, DONE_RECIPES } from './typeActions';
>>>>>>> 8738f6b179928e445659e23827b1e8341975d3cd

export const selectedCategory = (payload) => ({
  type: SELECTED_CATEGORY,
  payload,
});

<<<<<<< HEAD
export const updateFavorite = () => ({ type: UPDATE_FAVORITE });
=======
export const doneRecipes = (payload) => ({
  type: DONE_RECIPES,
  payload,
});
>>>>>>> 8738f6b179928e445659e23827b1e8341975d3cd
