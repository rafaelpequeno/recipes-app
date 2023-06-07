import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchRecipeDetails } from '../services/fetchMealDetails';

function DrinkDetails() {
  const [drinkDetails, setDrinkDetails] = useState([]);

  const { drinks } = drinkDetails;

  const { id } = useParams();

  const imageRef = useRef(null);

  useEffect(() => {
    const apiData = async () => {
      console.log(id);
      const drinkData = await fetchRecipeDetails(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      setDrinkDetails(drinkData);
    };
    apiData();
  }, [id]);
  return (
    <div>
      {drinks && (
        <div>
          <img
            ref={ imageRef }
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
          {console.log(drinks[0])}
        </div>)}
    </div>
  );
}

export default DrinkDetails;
