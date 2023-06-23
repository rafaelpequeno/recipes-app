import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../context/myContext';
import '../styles/DrinkCard.css';

function DrinkCard() {
  const {
    filteredDrinks,
    requestDrinkAPI,
    requestCategoryDrinkAPI,
  } = useContext(myContext);

  useEffect(() => {
    requestDrinkAPI();
    requestCategoryDrinkAPI();
  }, []);

  return (
    <section className="drink-list">
      {filteredDrinks.map(({ strDrink, strDrinkThumb, idDrink }, index) => (
        <Link
          key={ index }
          to={ `/drinks/${idDrink}` }
          className="recipe-drink-card"
        >
          <div
            data-testid={ `${index}-recipe-card` }
          >
            <h3
              data-testid={ `${index}-card-name` }
              className="recipe-drink-card-title"
            >
              { strDrink }
            </h3>
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
              data-testid={ `${index}-card-img` }
              className="recipe-card-picture"
            />
          </div>
        </Link>
      ))}
    </section>
  );
}

export default DrinkCard;
