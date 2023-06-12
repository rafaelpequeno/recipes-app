import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { drinkAPI } from '../services/drinkAPI';

import { mealAPI } from '../services/mealAPI';
import myContext from './myContext';

import drinkCategoryAPI from '../services/drinkCategoryAPI';
import mealCategoryAPI from '../services/mealCategoryAPI';

function Provider({ children }) {
  const [mealRecipes, setMealRecipes] = useState([]);

  const [drinkRecipes, setDrinkRecipes] = useState([]);

  const [categoryMeal, setCategoryMeal] = useState([]);
  const [meal5Category, setMeal5Category] = useState([{}]);

  const [categoryDrink, setCategoryDrink] = useState([]);
  const [drink5Category, setDrink5Category] = useState([{}]);

  const [filteredMeals, setFilteredMeals] = useState([{}]);
  const [filteredDrinks, setFilteredDrinks] = useState([{}]);

  const [filterOnOff, setFilterOnOff] = useState(true);

  const requestMealAPI = async () => {
    const fetchMeals = await mealAPI();
    setMealRecipes(fetchMeals);
    const recipes12 = 12;
    setFilteredMeals((fetchMeals.filter((_meal, index) => index < recipes12)));
  };

  const requestDrinkAPI = async () => {
    const fetchDrink = await drinkAPI();
    setDrinkRecipes(fetchDrink);
    const recipes12 = 12;
    setFilteredDrinks((fetchDrink.filter((_drink, index) => index < recipes12)));
  };

  const requestCategoryMealAPI = async () => {
    const fetchCategoryMeals = await mealCategoryAPI();
    setCategoryMeal(fetchCategoryMeals);
    const category5 = 5;
    if (fetchCategoryMeals.length > category5) {
      setMeal5Category((fetchCategoryMeals.filter((_meal, index) => index < category5)));
    }
  };

  const requestCategoryDrinkAPI = async () => {
    const fetchCategoryDrinks = await drinkCategoryAPI();
    setCategoryDrink(fetchCategoryDrinks);
    const category5 = 5;
    if (fetchCategoryDrinks.length > category5) {
      setDrink5Category((fetchCategoryDrinks
        .filter((_drink, index) => index < category5)));
    }
  };

  useEffect(() => {
    requestMealAPI();
    requestDrinkAPI();
    requestCategoryMealAPI();
    requestCategoryDrinkAPI();
  }, []);

  const states = useMemo(
    () => ({
      mealRecipes,
      setMealRecipes,
      drinkRecipes,
      categoryMeal,
      setCategoryMeal,
      meal5Category,
      setMeal5Category,
      categoryDrink,
      setCategoryDrink,
      drink5Category,
      setDrink5Category,
      filteredMeals,
      setFilteredMeals,
      filteredDrinks,
      setFilteredDrinks,
      filterOnOff,
      setFilterOnOff,
    }),
    [
      mealRecipes,
      setMealRecipes,
      drinkRecipes,
      categoryMeal,
      setCategoryMeal,
      meal5Category,
      setMeal5Category,
      categoryDrink,
      setCategoryDrink,
      drink5Category,
      setDrink5Category,
      filteredMeals,
      setFilteredMeals,
      filteredDrinks,
      setFilteredDrinks,
      filterOnOff,
      setFilterOnOff,
    ],
  );

  return (
    <myContext.Provider value={ states }>
      {children}
    </myContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
