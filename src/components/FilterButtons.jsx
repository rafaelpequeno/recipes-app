import React from 'react';
import PropTypes from 'prop-types';
import allIcon from '../images/🦆 icon _fast food outline_.svg';
import mealIcon from '../images/gray_meal_all.png';
import drinkIcon from '../images/gray_drink_all.png';

function FilterButtons({ onClick }) {
  return (
    <div className="filter-buttons">
      <label htmlFor="all-icon">
        All
        <img
          id="all-icon"
          data-testid="filter-by-all-btn"
          onClick={ onClick }
          name=""
          src={ allIcon }
          alt="All icon"
          aria-hidden="true"
          className="all-svg"
        />
      </label>
      <label htmlFor="meal-icon">
        Meals
        <img
          data-testid="filter-by-meal-btn"
          onClick={ onClick }
          name="meal"
          id="meal-icon"
          src={ mealIcon }
          alt="Meal Icon"
          aria-hidden="true"
        />
      </label>
      <label htmlFor="drink-icon">
        Drinks
        <img
          data-testid="filter-by-drink-btn"
          onClick={ onClick }
          name="drink"
          id="drink-icon"
          src={ drinkIcon }
          alt="Drink icon"
          aria-hidden="true"
        />
      </label>
    </div>
  );
}

FilterButtons.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default FilterButtons;
