import { FILTRED_RECIPES, SELECTED_CATEGORY } from './typeActions';

export const selectedCategory = (payload) => ({
  type: SELECTED_CATEGORY,
  payload,
});

export const filtredRecipesAction = (payload) => ({
  type: FILTRED_RECIPES,
  payload,
});
