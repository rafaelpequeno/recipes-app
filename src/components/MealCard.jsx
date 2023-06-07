import React, { useContext } from 'react';
import myContext from '../context/myContext';
import '../styles/MealCard.css';

function MealCard() {
  const {
    meal12Recipes,
  } = useContext(myContext);

  return (
    <section className="meal-list">
      {meal12Recipes.map(({ strMeal, strMealThumb }, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
          className="recipe-card"
        >
          <h3
            data-testid={ `${index}-card-name` }
            className="recipe-card-title"
          >
            { strMeal }
          </h3>
          <img
            src={ strMealThumb }
            alt={ strMeal }
            data-testid={ `${index}-card-img` }
            className="recipe-card-picture"
          />
        </div>
      ))}
    </section>
  );
}

export default MealCard;
