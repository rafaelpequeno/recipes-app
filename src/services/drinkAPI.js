const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const drinkAPI = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks;
};
