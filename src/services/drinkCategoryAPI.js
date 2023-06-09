const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const drinkCategoryAPI = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks;
};

export default drinkCategoryAPI;
