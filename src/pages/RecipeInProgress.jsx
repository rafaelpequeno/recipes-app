import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import filledHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import emptyHeart from '../images/whiteHeartIcon.svg';
import { fetchRecipeDetails } from '../services/fetchMealDetails';
import '../styles/RecipeInProgress.css';
import '../styles/StartRecipeBTN.css';

function RecipeInProgress() {
  const [mealOrDrink, setMealOrDrink] = useState();
  const [ingredientChecked, setIngredientChecked] = useState({});
  const [emptyLocalStorage, setEmptyLocalStorage] = useState(true);
  const [recipesInProgress, setRecipesInProgress] = useState({ drinks: {}, meals: {} });
  const [textToCopy, setTextToCopy] = useState('');
  const [CopyMessage, setCopyMessage] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(false);
  const [finishButtonDisabled, setFinishButtonDisabled] = useState(true);
  const { id } = useParams();
  const history = useHistory();
  const { location: { pathname } } = useHistory();

  const verifyFavorite = () => {
    const favoriteData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const verification = favoriteData !== null ? favoriteData
      .some((recipe) => recipe.id === id) : false;
    setFavoriteIcon(verification);
  };
  const verifyIngredientsAllChecked = () => {
    const allIngredients = Object
      .entries(mealOrDrink).filter(([key]) => key
        .startsWith('strIngredient') && mealOrDrink[key]);
    const ingredientsCheck = Object
      .keys(ingredientChecked).filter((element) => ingredientChecked[element] === true);
    return allIngredients.length === ingredientsCheck.length
      ? setFinishButtonDisabled(false) : setFinishButtonDisabled(true);
  };

  useEffect(() => {
    if (pathname.includes('/meals')) {
      const apiData = async () => {
        const mealData = await fetchRecipeDetails(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setMealOrDrink(mealData.meals[0]);
      };
      apiData();
      verifyFavorite();
      setTextToCopy(`http://localhost:3000/meals/${id}`);
    } else {
      const apiData = async () => {
        const drinkData = await fetchRecipeDetails(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        setMealOrDrink(drinkData.drinks[0]);
      };
      apiData();
      verifyFavorite();
      setTextToCopy(`http://localhost:3000/drinks/${id}`);
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
          return { ...prevState, meals: novoObjeto };
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
      verifyIngredientsAllChecked();
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
  const handleCopy = () => {
    setCopyMessage(true);
    clipboardCopy(textToCopy);
    const seconds = 2000;
    const timer = setTimeout(() => {
      setCopyMessage(false);
    }, seconds);
    return () => clearTimeout(timer);
  };
  const handleFavorite = () => {
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
  const handleClickFinish = () => {
    const dateNow = new Date();
    const doneRecipe = {
      id: mealOrDrink.idMeal || mealOrDrink.idDrink,
      type: pathname.includes('/meals') ? 'meal' : 'drink',
      nationality: pathname.includes('/meals') ? mealOrDrink.strArea : '',
      category: mealOrDrink.strCategory || '',
      alcoholicOrNot: pathname.includes('/drinks') ? mealOrDrink.strAlcoholic : '',
      name: mealOrDrink.strMeal || mealOrDrink.strDrink,
      image: mealOrDrink.strMealThumb || mealOrDrink.strDrinkThumb,
      doneDate: dateNow.toISOString(),
      tags: pathname.includes('/meals') ? mealOrDrink.strTags.split(',') : [],
    };
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    localStorage.setItem('doneRecipes', JSON
      .stringify([...doneRecipesStorage, doneRecipe]));
    history.push('/done-recipes');
  };

  return (
    <div>
      {mealOrDrink
        && (

          <div className="recipe-in-progress">
            <div className="recipe-in-progress-header">
              <img
                src={ mealOrDrink.strDrinkThumb || mealOrDrink.strMealThumb }
                alt="Imagem da Receita"
                width="150"
                data-testid="recipe-photo"
                className="recipe-in-progress-picture"
              />
              <div className="recipe-in-progress-title-area">
                <h1
                  data-testid="recipe-title"
                  className="recipe-in-progress-title"
                >
                  { mealOrDrink.strDrink || mealOrDrink.strMeal }
                </h1>
              </div>
            </div>
            <p data-testid="recipe-category" className="recipe-in-progress-tag">
              { mealOrDrink.strAlcoholic || mealOrDrink.strCategory }
            </p>

            <div className="details-and-ingredients">
              <div className="recipe-in-progress-ingredients">
                <h2 className="recipe-in-progress-h2-title">Ingredients</h2>

                {Object.entries(mealOrDrink)
                  .filter(([key]) => key.startsWith('strIngredient') && mealOrDrink[key])
                  .map(([key, value], index) => {
                    const ingredientsKey = key.replace('strIngredient', 'strMeasure');
                    const quantity = mealOrDrink[ingredientsKey] === null
                      ? '' : mealOrDrink[ingredientsKey];
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
              </div>
              <div className="recipe-in-progress-instructions">
                <h2 className="recipe-in-progress-h2-title">Instructions</h2>
                <p data-testid="instructions">{mealOrDrink.strInstructions}</p>
              </div>
            </div>

            <img
              src={ shareIcon }
              alt="Share button"
              data-testid="share-btn"
              onClick={ () => handleCopy() }
              aria-hidden="true"
              width="50"
              style={ { padding: '5px', display: 'flex' } }
            />
            {CopyMessage && <span>Link copied!</span>}
            <img
              src={ favoriteIcon ? filledHeart : emptyHeart }
              alt="favorite Icon"
              data-testid="favorite-btn"
              onClick={ () => handleFavorite() }
              aria-hidden="true"
            />
          </div>
        )}
      <div className="botoes-especiais">
        <button
          className="startRecipe"
          data-testid="finish-recipe-btn"
          disabled={ finishButtonDisabled }
          onClick={ () => handleClickFinish() }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeInProgress;
