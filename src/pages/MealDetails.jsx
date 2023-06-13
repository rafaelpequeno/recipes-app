import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchRecipeDetails } from '../services/fetchMealDetails';
import '../styles/StartRecipeBTN.css';
import '../styles/MealDetails.css';

function MealDetails() {
  const [mealDetails, setMealDetails] = useState([]);
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [doneRecipe, setDoneRecipe] = useState('');
  const [btnText, setBTNText] = useState('');

  const { meals } = mealDetails;
  const { drinks } = drinkDetails;

  const { id } = useParams();

  const carouselLength = 6;

  const history = useHistory();

  const updateLink = (oldLink) => oldLink.replace('watch', 'embed').replace(/\?v=/g, '/');

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

    apiData();
    verifyRecipe();
    verifyBTNText();
  }, [id]);

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <div>
      {meals && drinks && (
        <div className="meals-details">
          <div className="meals-details-header">
            <img
              src={ meals[0].strMealThumb }
              alt="Imagem da Receita"
              width="150"
              data-testid="recipe-photo"
              className="meals-details-picture"
            />
            <div className="meals-details-title-area">
              <h1
                data-testid="recipe-title"
                className="meals-details-title"
              >
                { meals[0].strMeal }
              </h1>
            </div>
          </div>
          <p
            data-testid="recipe-category"
            className="meals-details-tag"
          >
            { meals[0].strCategory }
          </p>
          <div className="meals-details-ingredients">
            <h2 className="meals-details-h2-title">Ingredients</h2>
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
          </div>
          <p
            data-testid="instructions"
            className="meals-details-instructions"
          >
            {meals[0].strInstructions}
          </p>
          <iframe
            data-testid="video"
            width="560"
            height="315"
            src={ updateLink(meals[0].strYoutube) }
            title="YouTube video player"
            allow="accelerometer"
            allowFullScreen
            className="meals-details-video"
          />
          <span className="meals-details-carousel">
            <h2 className="meals-details-h2-title">Recommended</h2>
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
                        className="d-block w-100 meals-details-picture-carousel"
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
            {/* {console.log(meals)} */}
          </span>
          {!doneRecipe && (
            <button
              className="startRecipe"
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`/meals/${id}/in-progress`) }
            >
              {btnText}
            </button>)}
          <button data-testid="share-btn">Share</button>
          <button data-testid="favorite-btn">Favorite</button>
        </div>)}
    </div>
  );
}

export default MealDetails;
