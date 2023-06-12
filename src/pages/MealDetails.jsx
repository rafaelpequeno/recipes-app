import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchRecipeDetails } from '../services/fetchMealDetails';

function MealDetails() {
  const [mealDetails, setMealDetails] = useState([]);
  const [drinkDetails, setDrinkDetails] = useState([]);

  const { meals } = mealDetails;
  const { drinks } = drinkDetails;

  const { id } = useParams();

  const carouselLength = 6;

  const updateLink = (oldLink) => oldLink.replace('watch', 'embed').replace(/\?v=/g, '/');

  useEffect(() => {
    const apiData = async () => {
      const mealData = await fetchRecipeDetails(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setMealDetails(mealData);

      const drinkData = await fetchRecipeDetails('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setDrinkDetails(drinkData);
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
        </div>)}
    </div>
  );
}

export default MealDetails;
