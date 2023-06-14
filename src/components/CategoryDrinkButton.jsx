import React, { useContext } from 'react';
import myContext from '../context/myContext';
import dinamicDrinkCategory from '../services/dinamicDrinkCategoryAPI';
import { drinkAPI } from '../services/drinkAPI';
import '../styles/CategoryDrinkButton.css';

function CategoryDrinkButton() {
  const {
    drink5Category,
    setFilteredDrinks,
    filterOnOff,
    setFilterOnOff,
  } = useContext(myContext);

  const handleAllBtn = async () => {
    const fetchDrinks = await drinkAPI();
    const recipes12 = 12;
    setFilteredDrinks((fetchDrinks.filter((_drink, index) => index < recipes12)));
  };

  const handleCLick = async (e) => {
    if (filterOnOff) {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${e}`;
      const fetchCategory = await dinamicDrinkCategory(URL);
      const recipes12 = 12;
      setFilteredDrinks((fetchCategory.filter((_drink, index) => index < recipes12)));
      setFilterOnOff(false);
    } else {
      await handleAllBtn();
      setFilterOnOff(true);
    }
  };

  return (
    <div className="buttons-list-drink">
      {drink5Category.map(({ strCategory }, index) => (
        <div
          key={ index }
          className={ `gray__drink__${strCategory}` }
        >
          <button
            key={ index }
            data-testid={ `${strCategory}-category-filter` }
            value={ strCategory }
            onClick={ (e) => handleCLick(e.target.value) }
            className="buttons-list-icon"
          >
            { strCategory }
          </button>
        </div>
      ))}
      <div className="gray__drink__All">
        <button
          data-testid="All-category-filter"
          onClick={ handleAllBtn }
          className="buttons-list-icon"
        >
          All
        </button>
      </div>
    </div>
  );
}

export default CategoryDrinkButton;
