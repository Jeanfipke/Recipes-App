import { SELECTED_CATEGORY } from './typeActions';

export const selectedCategory = (payload) => ({
  type: SELECTED_CATEGORY,
  payload,
});
