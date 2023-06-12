import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchRecipeDetails } from '../services/fetchMealDetails';

function DrinkDetails() {
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [mealDetails, setMealDetails] = useState([]);

  const { drinks } = drinkDetails;
  const { meals } = mealDetails;

  const { id } = useParams();

  const carouselLength = 6;

  useEffect(() => {
    const apiData = async () => {
      const drinkData = await fetchRecipeDetails(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      setDrinkDetails(drinkData);

      const mealData = await fetchRecipeDetails('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setMealDetails(mealData);
    };
    apiData();
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
        </div>)}
    </div>
  );
}

export default DrinkDetails;
