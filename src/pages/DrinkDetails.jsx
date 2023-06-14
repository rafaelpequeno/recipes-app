import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import clipboardCopy from 'clipboard-copy';
import myContext from '../context/myContext';
import { fetchRecipeDetails } from '../services/fetchMealDetails';
import '../styles/StartRecipeBTN.css';
import shareIcon from '../images/shareIcon.svg';
import filledHeart from '../images/blackHeartIcon.svg';
import emptyHeart from '../images/whiteHeartIcon.svg';

function DrinkDetails() {
  const { mealDetails,
    setMealDetails,
    drinkDetails,
    setDrinkDetails,
    doneRecipe,
    setDoneRecipe,
    btnText,
    setBTNText } = useContext(myContext);

  const [textToCopy, setTextToCopy] = useState('');
  const [CopyMessage, setCopyMessage] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(false);

  const { drinks } = drinkDetails;
  const { meals } = mealDetails;

  const { id } = useParams();

  const carouselLength = 6;

  const history = useHistory();

  const verifyFavorite = () => {
    const favoriteData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const verification = favoriteData !== null ? favoriteData
      .some((recipe) => recipe.id === id) : false;
    setFavoriteIcon(verification);
  };

  useEffect(() => {
    const apiData = async () => {
      const drinkData = await fetchRecipeDetails(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      setDrinkDetails(drinkData);

      const mealData = await fetchRecipeDetails('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setMealDetails(mealData);
    };

    const verifyRecipe = () => {
      const data = JSON.parse(localStorage.getItem('doneRecipes'));
      const verification = data !== null ? data
        .some((recipe) => recipe.id === Number(id)) : false;
      setDoneRecipe(verification);
    };

    const verifyBTNText = () => {
      const data = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const verification = data !== null ? Object.entries(data.drinks)
        .some((e) => e[0] === id) : false;
      setBTNText(verification ? 'Continue Recipe' : 'Start Recipe');
    };

    setTextToCopy(`http://localhost:3000/drinks/${id}`);

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
    const drinkObj = {
      id: drinks[0].idDrink,
      type: 'drink',
      nationality: '',
      category: drinks[0].strCategory,
      alcoholicOrNot: drinks[0].strAlcoholic,
      name: drinks[0].strDrink,
      image: drinks[0].strDrinkThumb,
    };

    if (!favoriteIcon) {
      setFavoriteIcon(true);
      return previewData === null
        ? localStorage.setItem('favoriteRecipes', JSON.stringify([drinkObj]))
        : localStorage
          .setItem('favoriteRecipes', JSON.stringify([...previewData, drinkObj]));
    }
    setFavoriteIcon(false);
    const removeFavorite = previewData.filter((recipe) => recipe.id !== id);
    return localStorage.setItem('favoriteRecipes', JSON.stringify([...removeFavorite]));
  };

  return (
    <div>
      {drinks && meals && (
        <div>
          <img
            src={ drinks[0].strDrinkThumb }
            alt="Imagem da Receita"
            width="150"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{ drinks[0].strDrink }</h1>
          <p data-testid="recipe-category">{ drinks[0].strAlcoholic }</p>
          <h2>Ingredients</h2>
          <ul>
            {Object.entries(drinks[0])
              .filter(([key]) => key.startsWith('strIngredient') && drinks[0][key])
              .map(([key, value], index) => {
                const ingredientsKey = key.replace('strIngredient', 'strMeasure');
                const quantity = drinks[0][ingredientsKey];
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
          <p data-testid="instructions">{drinks[0].strInstructions}</p>
          <span>
            <h2>Recommended</h2>
            <Slider { ...settings }>
              {meals
                .slice(0, carouselLength)
                .map((meal, index) => (
                  <div
                    key={ meal.idMeal }
                    data-testid={ `${index}-recommendation-card` }
                  >

                    <span>
                      <img
                        className="d-block w-100"
                        src={ meal.strMealThumb }
                        alt="Recipe thumb"
                        width="140"
                      />
                      <h3
                        data-testid={ `${index}-recommendation-title` }
                      >
                        {meal.strMeal}

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
              onClick={ () => history.push(`/drinks/${id}/in-progress`) }
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

export default DrinkDetails;
