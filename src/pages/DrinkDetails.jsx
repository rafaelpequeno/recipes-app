import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import myContext from '../context/myContext';
import { fetchRecipeDetails } from '../services/fetchMealDetails';
import '../styles/StartRecipeBTN.css';

function DrinkDetails() {
  const { mealDetails,
    setMealDetails,
    drinkDetails,
    setDrinkDetails,
    doneRecipe,
    setDoneRecipe,
    btnText,
    setBTNText } = useContext(myContext);

  const { drinks } = drinkDetails;
  const { meals } = mealDetails;

  const { id } = useParams();

  const carouselLength = 6;

  const history = useHistory();

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
          <button data-testid="share-btn">Share</button>
          <button data-testid="favorite-btn">Favorite</button>
        </div>)}
    </div>
  );
}

export default DrinkDetails;
