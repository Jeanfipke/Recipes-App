export const mealsApi = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL);
  const result = await response.json();
  return result;
};

export const drinksApi = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL);
  const result = await response.json();
  return result;
};

export const drinksCategoriesApi = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URL);
  const result = await response.json();
  return result;
};

export const mealsCategoriesApi = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URL);
  const result = await response.json();
  return result;
};

export const detailsRecipesApi = async (URL) => {
  const response = await fetch(URL);
  const result = await response.json();
  return result;
};
