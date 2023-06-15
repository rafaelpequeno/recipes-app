import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchRecipeDetails } from '../services/fetchMealDetails';
import '../styles/RecipeInProgress.css';
import '../styles/StartRecipeBTN.css';

function RecipeInProgress() {
  const [mealOrDrink, setMealOrDrink] = useState();
  const [ingredientChecked, setIngredientChecked] = useState({});
  const [emptyLocalStorage, setEmptyLocalStorage] = useState(true);
  const [recipesInProgress, setRecipesInProgress] = useState({ drinks: {}, meals: {} });

  const { id } = useParams();

  const history = useHistory();
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    if (pathname.includes('/meals')) {
      const apiData = async () => {
        const mealData = await fetchRecipeDetails(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setMealOrDrink(mealData.meals[0]);
      };
      apiData();
    } else {
      const apiData = async () => {
        const drinkData = await fetchRecipeDetails(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        setMealOrDrink(drinkData.drinks[0]);
      };
      apiData();
    }
  }, [id]);

  const handleInputChange = ({ target }) => {
    const { name, checked } = target;
    setIngredientChecked({ ...ingredientChecked, [name]: checked });
  };

  useEffect(() => {
    if (mealOrDrink) {
      if (pathname.includes('/meals')) {
        setRecipesInProgress((prevState) => {
          const novoObjeto = { ...prevState.meals };
          const ingredients = Object.keys(ingredientChecked)
            .filter((element) => ingredientChecked[element] === true);
          console.log(ingredients);
          novoObjeto[mealOrDrink.idMeal] = ingredients;
          return {
            ...prevState,
            meals: novoObjeto,
          };
        });
        setEmptyLocalStorage(false);
      }
      if (pathname.includes('/drinks')) {
        setRecipesInProgress((prevState) => {
          const novoObjeto = { ...prevState.drinks };
          const ingredients = Object.keys(ingredientChecked)
            .filter((element) => ingredientChecked[element] === true);
          console.log(ingredients);
          novoObjeto[mealOrDrink.idDrink] = ingredients;
          return {
            ...prevState,
            drinks: novoObjeto,
          };
        });
        setEmptyLocalStorage(false);
      }
    }
  }, [ingredientChecked]);

  useEffect(() => {
    if (!emptyLocalStorage) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    }
  }, [recipesInProgress]);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipes) {
      if (pathname.includes(`/meals/${id}`)) {
        const ingredients = recipes.meals[id];
        const newObjIngredients = {};
        ingredients.forEach((ingredient) => {
          newObjIngredients[ingredient] = true;
        });
        setIngredientChecked(newObjIngredients);
      } else if (pathname.includes(`/drinks/${id}/in-progress`)) {
        const ingredients = recipes.drinks[id];
        const newObjIngredients = {};
        ingredients.forEach((ingredient) => {
          newObjIngredients[ingredient] = true;
        });
        setIngredientChecked(newObjIngredients);
      }
    }
  }, []);

  return (
    <div>
      {mealOrDrink
        && (
          <div>
            <img
              src={ mealOrDrink.strDrinkThumb || mealOrDrink.strMealThumb }
              alt="Imagem da Receita"
              width="150"
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">
              { mealOrDrink.strDrink || mealOrDrink.strMeal }
            </h1>
            <p data-testid="recipe-category">
              { mealOrDrink.strAlcoholic || mealOrDrink.strCategory }
            </p>
            <h2>Ingredients</h2>
            {Object.entries(mealOrDrink)
              .filter(([key]) => key.startsWith('strIngredient') && mealOrDrink[key])
              .map(([key, value], index) => {
                const ingredientsKey = key.replace('strIngredient', 'strMeasure');
                const quantity = mealOrDrink[ingredientsKey];
                const ingredientWithQuantity = `${quantity} ${value}`;
                return (
                  <div
                    key={ key }
                  >
                    <label
                      data-testid={ `${index}-ingredient-step` }
                      htmlFor={ `${index}-ingredient-step` }
                      className={ ingredientChecked[`${index}-ingredient-step`]
                        ? 'ingredient-checked' : '' }
                    >
                      <input
                        type="checkbox"
                        id={ `${index}-ingredient-step` }
                        name={ `${index}-ingredient-step` }
                        checked={ ingredientChecked[`${index}-ingredient-step`] || false }
                        onChange={ handleInputChange }
                      />
                      {ingredientWithQuantity}
                    </label>
                  </div>
                );
              })}
            <p data-testid="instructions">{mealOrDrink.strInstructions}</p>
            <button
              className="startRecipe"
              data-testid="finish-recipe-btn"
              onClick={ () => history.push(`/drinks/${id}/in-progress`) }
            >
              Finish Recipe
            </button>
            <button data-testid="share-btn">Share</button>
            <button data-testid="favorite-btn">Favorite</button>
          </div>
        )}
    </div>
  );
}

export default RecipeInProgress;
