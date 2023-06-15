import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import filledHeart from '../images/blackHeartIcon.svg';
import emptyHeart from '../images/whiteHeartIcon.svg';
import myContext from '../context/myContext';
import { fetchRecipeDetails } from '../services/fetchMealDetails';
import '../styles/MealDetails.css';
import '../styles/DrinkDetails.css';
import '../styles/StartRecipeBTN.css';

function RecipeDetails() {
  const {
    doneRecipe,
    setDoneRecipe,
    btnText,
    setBTNText,
  } = useContext(myContext);

  const [recipeData, setRecipeData] = useState([]);
  const [carouselData, setCarouselData] = useState([]);
  const [CopyMessage, setCopyMessage] = useState(false);
  const [textToCopy, setTextToCopy] = useState('');
  const [favoriteIcon, setFavoriteIcon] = useState(false);
  const [route, setRoute] = useState();
  const [youtubetLink, setYoutubeLink] = useState('');

  const { location: { pathname } } = useHistory();

  const history = useHistory();
  const { id } = useParams();

  const carouselLength = 6;

  const updateLink = (oldLink) => oldLink.replace('watch', 'embed').replace(/\?v=/g, '/');

  const apiData = async () => {
    if (pathname.includes('meals')) {
      const mealRecipe = await fetchRecipeDetails(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const drinkCarousel = await fetchRecipeDetails('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setRecipeData(mealRecipe.meals[0]);
      setYoutubeLink(mealRecipe.meals[0].strYoutube);
      setCarouselData(drinkCarousel.drinks);
    } else {
      const drinkRecipe = await fetchRecipeDetails(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const mealCarousel = await fetchRecipeDetails('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setRecipeData(drinkRecipe.drinks[0]);
      setCarouselData(mealCarousel.meals);
    }
  };

  const verifyBTNText = () => {
    const data = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const verification = data !== null ? Object.entries(data.meals || data.drinks)
      .some((e) => e[0] === id) : false;
    setBTNText(verification ? 'Continue Recipe' : 'Start Recipe');
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
    apiData();
    verifyBTNText();
    verifyFavorite();
    verifyRecipe();
    const routeData = pathname.match(/\/([^/]+)/)[1];
    setRoute(routeData);
    setTextToCopy(`http://localhost:3000/${route}/${id}`);
  }, [id, route]);

  const settings = {
    arrows: false,
    dots: true,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

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
          <div className={ `${route}-details-ingredients` }>
            <h2 className={ `${route}-details-h2-title` }>Ingredients</h2>
            <ul>
              {Object.entries(recipeData)
                .filter(([key]) => key.startsWith('strIngredient') && recipeData[key])
                .map(([key, value], index) => {
                  const IngredientsKey = key.replace('strIngredient', 'strMeasure');
                  const quantity = recipeData[IngredientsKey];
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
          <p
            data-testid="instructions"
            className={ `${route}-details-instructions` }
          >
            {recipeData.strInstructions}
          </p>
          {youtubetLink && (
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ updateLink(youtubetLink) }
              title="YouTube video player"
              allow="accelerometer"
              allowFullScreen
              className="meals-details-video"
            />)}
          {carouselData && (
            <span className="meals-details-carousel">
              <h2 className="meals-details-h2-title">Recommended</h2>
              <Slider { ...settings }>
                {carouselData
                  .slice(0, carouselLength)
                  .map((recipe, index) => (
                    <div
                      key={ recipe.idMeal || recipe.idDrink }
                      data-testid={ `${index}-recommendation-card` }
                    >
                      <span>
                        <img
                          className="d-block w-100 meals-details-picture-carousel"
                          src={ recipe.strMealThumb || recipe.strDrinkThumb }
                          alt="Recipe thumb"
                          width="140"
                        />
                        <h3
                          data-testid={ `${index}-recommendation-title` }
                        >
                          {recipe.strMeal || recipe.strDrink }
                        </h3>
                      </span>
                    </div>
                  ))}
              </Slider>
            </span>
          )}
          {!doneRecipe && (
            <button
              className="startRecipe"
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`/${route}/${id}/in-progress`) }
            >
              {btnText}
            </button>)}
          <img
            src={ shareIcon }
            alt="Share button"
            data-testid="share-btn"
            onClick={ () => handleCopy() }
            aria-hidden="true"
            width="50"
            // style só está aqui pois outros elementos ficam a frente dele e não passa no avaliador ao fazer css pode ser removido
            style={ { padding: '5px', display: 'flex' } }
          />
          {CopyMessage && <span style={ { display: 'flex' } }>Link copied!</span>}
          <img
            src={ favoriteIcon ? filledHeart : emptyHeart }
            alt="favorite Icon"
            data-testid="favorite-btn"
            onClick={ () => handleFavorite() }
            aria-hidden="true"
          />
        </div>)}
    </div>
  );
}

export default RecipeDetails;
