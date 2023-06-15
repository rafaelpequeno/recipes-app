import React, { useContext } from 'react';
import myContext from '../context/myContext';
import dinamicMealCategory from '../services/dinamicMealCategoryAPI';
import { mealAPI } from '../services/mealAPI';
import '../styles/CategoryMealButton.css';

function CategoryMealButton() {
  const {
    meal5Category,
    setFilteredMeals,
    filterOnOff,
    setFilterOnOff,
  } = useContext(myContext);

  const handleAllBtn = async () => {
    const fetchMeals = await mealAPI();
    const recipes12 = 12;
    setFilteredMeals((fetchMeals.filter((_meal, index) => index < recipes12)));
  };

  const handleCLick = async (e) => {
    if (filterOnOff) {
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e}`;
      const fetchCategory = await dinamicMealCategory(URL);
      const recipes12 = 12;
      setFilteredMeals((fetchCategory.filter((_meal, index) => index < recipes12)));
      setFilterOnOff(false);
    } else {
      await handleAllBtn();
      setFilterOnOff(true);
    }
  };

  return (
    <div className="buttons-list-meal">
      {meal5Category.map(({ strCategory }, index) => (
        <div
          key={ index }
          className={ `gray__meal__${strCategory}` }
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
      <div className="gray__meal__All">
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

export default CategoryMealButton;
