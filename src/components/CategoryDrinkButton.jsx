import React, { useContext } from 'react';
import myContext from '../context/myContext';
import dinamicDrinkCategory from '../services/dinamicDrinkCategoryAPI';
import { drinkAPI } from '../services/drinkAPI';

function CategoryDrinkButton() {
  const {
    drink5Category,
    setFilteredDrinks,
  } = useContext(myContext);

  const handleCLick = async (e) => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${e}`;
    const fetchCategory = await dinamicDrinkCategory(URL);
    const recipes12 = 12;
    setFilteredDrinks((fetchCategory.filter((_drink, index) => index < recipes12)));
  };

  const handleAllBtn = async () => {
    const fetchDrinks = await drinkAPI();
    const recipes12 = 12;
    setFilteredDrinks((fetchDrinks.filter((_drink, index) => index < recipes12)));
  };

  return (
    <div>
      <section>
        {drink5Category.map(({ strCategory }, index) => (
          <button
            key={ index }
            data-testid={ `${strCategory}-category-filter` }
            value={ strCategory }
            onClick={ (e) => handleCLick(e.target.value) }
          >
            { strCategory }
          </button>
        ))}
      </section>
      <button
        data-testid="All-category-filter"
        onClick={ handleAllBtn }
      >
        All
      </button>
    </div>
  );
}

export default CategoryDrinkButton;
