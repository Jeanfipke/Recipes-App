import { SELECTED_CATEGORY, DONE_RECIPES } from './typeActions';

export const selectedCategory = (payload) => ({
  type: SELECTED_CATEGORY,
  payload,
});

export const doneRecipes = (payload) => ({
  type: DONE_RECIPES,
  payload,
});
