import React, { useContext } from 'react';
import myContext from '../context/myContext';
import '../styles/MealCard.css';

function MealCard() {
  const {
    filteredMeals,
  } = useContext(myContext);

  return (

    <div>
      <section className="meal-list">
        {filteredMeals.map(({ strMeal, strMealThumb }, index) => (
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
