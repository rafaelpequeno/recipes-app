import React, { useContext } from 'react';
import myContext from '../context/myContext';
import dinamicMealCategory from '../services/dinamicMealCategoryAPI';
import { mealAPI } from '../services/mealAPI';
import '../styles/CategoryMealButton.css';
// import beef from '../images/gray__meal__Beef.png';
// import breakfast from '../images/gray__meal__Breakfast.png';
// import chicken from '../images/gray__meal__Chicken.png';
// import dessert from '../images/gray__meal__Dessert.png';
// import goat from '../images/gray__meal__Goat.png';
// import all from '../images/gray__meal__All.png';

function CategoryMealButton() {
  const {
    meal5Category,
    setFilteredMeals,
    filterOnOff,
    setFilterOnOff,
  } = useContext(myContext);

  // const buttonsIcons = [
  //   beef, breakfast, chicken, dessert, goat, all,
  // ];

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
    <div className="buttons-list">
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
      <div className="gray__meal__all">
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
