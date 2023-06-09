const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

const mealCategoryAPI = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
};

export default mealCategoryAPI;
