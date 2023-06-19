export const handleFavorite = ({
  mealOrDrink,
  pathname,
  favoriteIcon,
  setFavoriteIcon, id }) => {
  const previewData = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const mealOrDrinkFavorited = {
    id: mealOrDrink.idMeal || mealOrDrink.idDrink,
    type: pathname.includes('/meals') ? 'meal' : 'drink',
    nationality: pathname.includes('/meals') ? mealOrDrink.strArea : '',
    category: mealOrDrink.strCategory || '',
    alcoholicOrNot: pathname.includes('/drinks') ? mealOrDrink.strAlcoholic : '',
    name: mealOrDrink.strMeal || mealOrDrink.strDrink,
    image: mealOrDrink.strMealThumb || mealOrDrink.strDrinkThumb,
  };
  if (!favoriteIcon) {
    setFavoriteIcon(true);
    return previewData === null
      ? localStorage.setItem('favoriteRecipes', JSON.stringify([mealOrDrinkFavorited]))
      : localStorage.setItem('favoriteRecipes', JSON
        .stringify([...previewData, mealOrDrinkFavorited]));
  }
  setFavoriteIcon(false);
  const removeFavorite = previewData.filter((recipe) => recipe.id !== id);
  return localStorage.setItem('favoriteRecipes', JSON.stringify([...removeFavorite]));
};
