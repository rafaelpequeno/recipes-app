import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchRecipeDetails } from '../services/fetchMealDetails';

function RecipeDetails() {
  const { id } = useParams();
  useEffect(() => {
    const apiData = async () => {
      const mealData = fetchRecipeDetails(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const drinkData = fetchRecipeDetails(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      console.log(mealData);
      console.log(drinkData);
    };
    apiData();
  }, []);
  return (
    <div>
      <h1>Recipes Details</h1>
    </div>
  );
}

export default RecipeDetails;
