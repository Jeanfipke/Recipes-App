import { SELECTED_CATEGORY, UPDATE_FAVORITE } from './typeActions';

export const selectedCategory = (payload) => ({
  type: SELECTED_CATEGORY,
  payload,
});

export const updateFavorite = () => ({ type: UPDATE_FAVORITE });
