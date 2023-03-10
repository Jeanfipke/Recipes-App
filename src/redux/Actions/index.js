import { SELECTED_CATEGORY, UPDATE_FAVORITE, DONE_RECIPES } from './typeActions';

export const selectedCategory = (payload) => ({
  type: SELECTED_CATEGORY,
  payload,
});

export const updateFavorite = () => ({ type: UPDATE_FAVORITE });

export const doneRecipes = (payload) => ({
  type: DONE_RECIPES,
  payload,
});
