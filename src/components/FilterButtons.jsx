import React from 'react';
import PropTypes from 'prop-types';

function FilterButtons({ onClick }) {
  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        onClick={ onClick }
        name=""
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ onClick }
        name="meal"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ onClick }
        name="drink"
      >
        Drinks
      </button>
    </div>
  );
}

FilterButtons.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default FilterButtons;
