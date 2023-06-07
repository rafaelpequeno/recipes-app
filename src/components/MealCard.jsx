import React, { useContext } from 'react';
import myContext from '../context/myContext';

function MealCard() {
  const {
    filteredMeals,
  } = useContext(myContext);

  return (
    <div>
      <section>
        {filteredMeals.map(({ strMeal, strMealThumb }, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <h3
              data-testid={ `${index}-card-name` }
            >
              { strMeal }
            </h3>
            <img
              src={ strMealThumb }
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))}
      </section>
    </div>
  );
}

export default MealCard;
