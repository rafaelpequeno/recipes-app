const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const mealAPI = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
};
