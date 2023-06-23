import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../context/myContext';
import '../styles/MealCard.css';

function MealCard() {
  const {
    filteredMeals,
    requestMealAPI,
    requestCategoryMealAPI,
  } = useContext(myContext);

  useEffect(() => {
    requestMealAPI();
    requestCategoryMealAPI();
  }, []);

  return (
    <section className="meal-list">
      {filteredMeals.map(({ strMeal, strMealThumb, idMeal }, index) => (
        <Link
          key={ index }
          to={ `/meals/${idMeal}` }
          className="recipe-meal-card"
        >
          <div
            data-testid={ `${index}-recipe-card` }
          >
            <h3
              data-testid={ `${index}-card-name` }
              className="recipe-meal-card-title"
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
  );
}

export default MealCard;
