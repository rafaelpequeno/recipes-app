import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import myContext from './myContext';
import { mealAPI } from '../services/mealAPI';
import { drinkAPI } from '../services/drinkAPI';

function Provider({ children }) {
  const [mealRecipes, setMealRecipes] = useState([]);
  const [meal12Recipes, setMeal12Recipes] = useState([{}]);

  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const [drink12Recipes, setDrink12Recipes] = useState([{}]);

  const requestMealAPI = async () => {
    const fetchMeals = await mealAPI();
    setMealRecipes(fetchMeals);
    const recipes12 = 12;
    if (fetchMeals.length > recipes12) {
      setMeal12Recipes((fetchMeals.filter((_meal, index) => index < recipes12)));
    }
  };

  const requestDrinkAPI = async () => {
    const fetchDrink = await drinkAPI();
    setDrinkRecipes(fetchDrink);
    const recipes12 = 12;
    if (fetchDrink.length > recipes12) {
      setDrink12Recipes((fetchDrink.filter((_drink, index) => index < recipes12)));
    }
  };

  useEffect(() => {
    requestMealAPI();
    requestDrinkAPI();
  }, []);

  const states = useMemo(
    () => ({
      mealRecipes,
      meal12Recipes,
      drinkRecipes,
      drink12Recipes,
    }),
    [
      mealRecipes,
      meal12Recipes,
      drinkRecipes,
      drink12Recipes,
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
