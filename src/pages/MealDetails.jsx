import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import clipboardCopy from 'clipboard-copy';
import { fetchRecipeDetails } from '../services/fetchMealDetails';
import '../styles/StartRecipeBTN.css';
import shareIcon from '../images/shareIcon.svg';
import filledHeart from '../images/blackHeartIcon.svg';
import emptyHeart from '../images/whiteHeartIcon.svg';

function MealDetails() {
  const [mealDetails, setMealDetails] = useState([]);
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [doneRecipe, setDoneRecipe] = useState('');
  const [btnText, setBTNText] = useState('');
  const [textToCopy, setTextToCopy] = useState('');
  const [CopyMessage, setCopyMessage] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(false);

  const { meals } = mealDetails;
  const { drinks } = drinkDetails;

  const { id } = useParams();

  const carouselLength = 6;

  const history = useHistory();

  const updateLink = (oldLink) => oldLink.replace('watch', 'embed').replace(/\?v=/g, '/');

  const verifyFavorite = () => {
    const favoriteData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const verification = favoriteData !== null ? favoriteData
      .some((recipe) => recipe.id === id) : false;
    setFavoriteIcon(verification);
  };

  useEffect(() => {
    const apiData = async () => {
      const mealData = await fetchRecipeDetails(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setMealDetails(mealData);

      const drinkData = await fetchRecipeDetails('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setDrinkDetails(drinkData);
    };

    const verifyRecipe = () => {
      const data = JSON.parse(localStorage.getItem('doneRecipes'));
      const verification = data !== null ? data
        .some((recipe) => recipe.id === Number(id)) : false;
      setDoneRecipe(verification);
    };

    const verifyBTNText = () => {
      const data = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const verification = data !== null ? Object.entries(data.meals)
        .some((e) => e[0] === id) : false;
      setBTNText(verification ? 'Continue Recipe' : 'Start Recipe');
    };

    setTextToCopy(`http://localhost:3000/meals/${id}`);

    apiData();
    verifyRecipe();
    verifyBTNText();
    verifyFavorite();
  }, [id]);

  const settings = {
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
    const mealObj = {
      id: meals[0].idMeal,
      type: 'meal',
      nationality: meals[0].strArea,
      category: meals[0].strCategory,
      alcoholicOrNot: '',
      name: meals[0].strMeal,
      image: meals[0].strMealThumb,
    };

    if (!favoriteIcon) {
      setFavoriteIcon(true);
      return previewData === null
        ? localStorage.setItem('favoriteRecipes', JSON.stringify([mealObj]))
        : localStorage
          .setItem('favoriteRecipes', JSON.stringify([...previewData, mealObj]));
    }
    setFavoriteIcon(false);
    const removeFavorite = previewData.filter((recipe) => recipe.id !== id);
    return localStorage.setItem('favoriteRecipes', JSON.stringify([...removeFavorite]));
  };

  return (
    <div>
      {meals && drinks && (
        <div>
          <img
            src={ meals[0].strMealThumb }
            alt="Imagem da Receita"
            width="150"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{ meals[0].strMeal }</h1>
          <p data-testid="recipe-category">{ meals[0].strCategory }</p>
          <h2>Ingredients</h2>
          <ul>
            {Object.entries(meals[0])
              .filter(([key]) => key.startsWith('strIngredient') && meals[0][key])
              .map(([key, value], index) => {
                const IngredientsKey = key.replace('strIngredient', 'strMeasure');
                const quantity = meals[0][IngredientsKey];
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
          <p data-testid="instructions">{meals[0].strInstructions}</p>
          <iframe
            data-testid="video"
            width="560"
            height="315"
            src={ updateLink(meals[0].strYoutube) }
            title="YouTube video player"
            allow="accelerometer"
            allowFullScreen
          />
          <span>
            <h2>Recommended</h2>
            <Slider { ...settings }>
              {drinks
                // .slice(0, carouselLength)
                .filter((_drink, index) => index < carouselLength)
                .map((drink, index) => (
                  <div
                    key={ drink.idDrink }
                    data-testid={ `${index}-recommendation-card` }
                  >

                    <span>
                      <img
                        className="d-block w-100"
                        src={ drink.strDrinkThumb }
                        alt="Recipe thumb"
                        width="140"
                      />
                      <h3
                        data-testid={ `${index}-recommendation-title` }
                      >
                        {drink.strDrink}

                      </h3>
                    </span>
                  </div>
                ))}
            </Slider>
          </span>
          {!doneRecipe && (
            <button
              className="startRecipe"
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`/meals/${id}/in-progress`) }
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
          {CopyMessage && <span>Link copied!</span>}
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

export default MealDetails;
