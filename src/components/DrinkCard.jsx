import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../context/myContext';

function DrinkCard() {
  const {
    filteredDrinks,
  } = useContext(myContext);

  return (
    <div>
      <section>
        {filteredDrinks.map(({ strDrink, strDrinkThumb, idDrink }, index) => (
          <Link key={ index } to={ `/drinks/${idDrink}` }>
            <div
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
          </Link>
        ))}
      </section>
    </div>
  );
}

export default DrinkCard;
