import clipboardCopy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Carousel from '../components/Carousel';
import YoutubeVideo from '../components/YoutubeVideo';
import myContext from '../context/myContext';
import filledHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import emptyHeart from '../images/whiteHeartIcon.svg';
import { drinkAPI } from '../services/drinkAPI';
import { fetchRecipeDetails } from '../services/fetchMealDetails';
import { mealAPI } from '../services/mealAPI';
import '../styles/DrinkDetails.css';
import '../styles/MealDetails.css';
import '../styles/RecipeDetails.css';
import '../styles/StartRecipeBTN.css';

function RecipeDetails() {
  const {
    doneRecipe,
    setDoneRecipe,
    btnText,
    setBTNText,
    youtubetLink,
    setYoutubeLink,
    carouselData,
    setCarouselData,
  } = useContext(myContext);

  const [recipeData, setRecipeData] = useState([]);
  const [CopyMessage, setCopyMessage] = useState(false);
  const [textToCopy, setTextToCopy] = useState('');
  const [favoriteIcon, setFavoriteIcon] = useState(false);
  const [route, setRoute] = useState();

  const { location: { pathname } } = useHistory();

  const history = useHistory();
  const { id } = useParams();

  const apiData = async () => {
    if (pathname.includes('meals')) {
      const mealRecipe = await fetchRecipeDetails(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const drinkCarousel = await drinkAPI();
      setRecipeData(mealRecipe.meals[0]);
      setYoutubeLink(mealRecipe.meals[0].strYoutube);
      setCarouselData(drinkCarousel);
    } else {
      const drinkRecipe = await fetchRecipeDetails(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const mealCarousel = await mealAPI();
      setRecipeData(drinkRecipe.drinks[0]);
      setCarouselData(mealCarousel);
    }
  };

  const verifyBTNText = () => {
    const txtStartRecipe = 'Start Recipe';
    const data = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (data !== null) {
      if (data.drinks && data.drinks.length !== null && data.drinks.length !== 0) {
        const verification = Object.entries(data.drinks).some((e) => e[0] === id);
        setBTNText(verification ? 'Continue Recipe' : txtStartRecipe);
      } else {
        const verification = Object.entries(data.meals).some((e) => e[0] === id);
        setBTNText(verification ? 'Continue Recipe' : txtStartRecipe);
      }
    } else {
      setBTNText(txtStartRecipe);
    }
    // const verification = data === null ? false : (Object.entries(data.meals).some((e) => e[0] === id) !== true) ? Object.entries(data.drinks).some((e) => e[0] === id) : true;
    // setBTNText(verification ? 'Continue Recipe' : 'Start Recipe');
  };

  const verifyFavorite = () => {
    const favoriteData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const verification = favoriteData !== null ? favoriteData
      .some((recipe) => recipe.id === id) : false;
    setFavoriteIcon(verification);
  };

  const verifyRecipe = () => {
    const data = JSON.parse(localStorage.getItem('doneRecipes'));
    const verification = data !== null ? data
      .some((recipe) => recipe.id === Number(id)) : false;
    setDoneRecipe(verification);
  };

  useEffect(() => {
    verifyBTNText();
    verifyFavorite();
    verifyRecipe();
    const routeData = pathname.match(/\/([^/]+)/)[1];
    setRoute(routeData);
    setTextToCopy(`http://localhost:3000/${route}/${id}`);
  }, [id, route, btnText]);

  useEffect(() => {
    apiData();
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

    const favoriteRecipe = {
      id: recipeData.idDrink || recipeData.idMeal,
      type: pathname.includes('drink') ? 'drink' : 'meal',
      nationality: recipeData.strArea || '',
      category: recipeData.strCategory,
      alcoholicOrNot: recipeData.strAlcoholic || '',
      name: recipeData.strDrink || recipeData.strMeal,
      image: recipeData.strDrinkThumb || recipeData.strMealThumb,
    };

    if (!favoriteIcon) {
      setFavoriteIcon(true);
      return previewData === null
        ? localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipe]))
        : localStorage
          .setItem('favoriteRecipes', JSON
            .stringify([...previewData, favoriteRecipe]));
    }
    setFavoriteIcon(false);
    const removeFavorite = previewData.filter((recipe) => recipe.id !== id);
    return localStorage.setItem('favoriteRecipes', JSON.stringify([...removeFavorite]));
  };

  return (
    <div>
      {recipeData && (
        <div className={ `${route}-details` }>
          <div className={ `${route}-details-header` }>
            <img
              src={ recipeData.strMealThumb || recipeData.strDrinkThumb }
              alt="Done recipe"
              width="150"
              data-testid="recipe-photo"
              className={ `${route}-details-picture` }
            />
            <div className={ `${route}-details-title-area` }>
              <h1
                data-testid="recipe-title"
                className={ `${route}-details-title` }
              >
                { recipeData.strMeal || recipeData.strDrink }
              </h1>
            </div>
          </div>
          <p
            data-testid="recipe-category"
            className={ `${route}-details-tag` }
          >
            { route === 'drinks' ? recipeData.strAlcoholic
              : recipeData.strCategory }
          </p>

          <div className="details-and-ingredients">

            <div className={ `${route}-details-ingredients` }>
              <h2 className={ `${route}-details-h2-title` }>Ingredients</h2>
              <ul>
                {Object.entries(recipeData)
                  .filter(([key]) => key.startsWith('strIngredient') && recipeData[key])
                  .map(([key, value], index) => {
                    const IngredientsKey = key.replace('strIngredient', 'strMeasure');
                    const quantity = recipeData[IngredientsKey] === null
                      ? '' : recipeData[IngredientsKey];
                    const ingredientWithQuantity = `${quantity} ${value}`;
                    return (
                      <li
                        data-testid={ `${index}-ingredient-name-and-measure` }
                        key={ key }
                      >
                        {ingredientWithQuantity}
                      </li>
                    );
                  })}
              </ul>
            </div>

            <div className={ `${route}-details-instructions` }>
              <h2 className={ `${route}-details-h2-title` }>Instructions</h2>
              <p
                data-testid="instructions"
                className={ `${route}-details-instructions` }
              >
                {recipeData.strInstructions}
              </p>
            </div>

          </div>

          {youtubetLink && <YoutubeVideo />}

          {carouselData && <Carousel />}

          {CopyMessage && <span className="copy-message">Link copied!</span>}

          <span className="fav-and-share">
            <img
              src={ shareIcon }
              alt="Share button"
              data-testid="share-btn"
              onClick={ () => handleCopy() }
              aria-hidden="true"
            />

            <img
              src={ favoriteIcon ? filledHeart : emptyHeart }
              alt="favorite Icon"
              data-testid="favorite-btn"
              onClick={ () => handleFavorite() }
              aria-hidden="true"
            />
          </span>
        </div>)}

      {!doneRecipe && !CopyMessage && (
        <div className="botoes-especiais">
          <button
            className="startRecipe"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`/${route}/${id}/in-progress`) }
          >
            {btnText}
          </button>
        </div>)}
    </div>
  );
}

export default RecipeDetails;
