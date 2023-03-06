const ErroMsg = 'Nenhum resultado encontrado';

export const recipeAPI = async (URL) => {
  try {
    const response = await fetch(URL);
    const result = await response.json();
    if (result.meals === null || result.drinks === null) {
      throw new Error(ErroMsg);
    }
    return result;
  } catch (e) {
    throw new Error(ErroMsg);
  }
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
