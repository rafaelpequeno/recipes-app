const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const mealAPI = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
};

export const fetchIngredientSearchMeals = async (ingredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data.meals;
};

export const fetchRecipeNameSearchMeals = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data.meals;
};

export const fetchFirstLetterSearchMeals = async (letter) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await response.json();
  return data.meals;
};
