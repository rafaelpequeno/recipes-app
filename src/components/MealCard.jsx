import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../context/myContext';
import '../styles/MealCard.css';

function MealCard() {
  const {
    filteredMeals,
  } = useContext(myContext);

  return (
    <div>
      <section className="meal-list">
        {filteredMeals.map(({ strMeal, strMealThumb, idMeal }, index) => (
          <Link key={ index } to={ `/meals/${idMeal}` }>
            <div
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
          </Link>

        ))}
      </section>
    </div>
  );
}

export default MealCard;
