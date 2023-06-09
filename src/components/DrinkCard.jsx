import React, { useContext } from 'react';
import myContext from '../context/myContext';

function DrinkCard() {
  const {
    filteredDrinks,
  } = useContext(myContext);

  return (
    <div>
      <section>
        {filteredDrinks.map(({ strDrink, strDrinkThumb }, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <h3
              data-testid={ `${index}-card-name` }
            >
              { strDrink }
            </h3>
            <img
              height="100"
              width="100"
              src={ strDrinkThumb }
              alt={ strDrink }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))}
      </section>
    </div>
  );
}

export default DrinkCard;
