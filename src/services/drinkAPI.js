const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const drinkAPI = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks;
};

export const fetchIngredientSearchDrinks = async (ingredient) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data.drinks;
};

export const fetchRecipeNameSearchDrinks = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data.drinks;
};

export const fetchFirstLetterSearchDrinks = async (letter) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await response.json();
  return data.drinks;
};
