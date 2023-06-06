import React from 'react';
import { useHistory } from 'react-router-dom';
import MealCard from '../components/MealCard';
import DrinkCard from '../components/DrinkCard';

function Recipes() {
  const { location: { pathname } } = useHistory();
  return (
    <div>
      {pathname === '/meals'
          && <MealCard />}
      {pathname === '/drinks'
          && <DrinkCard />}
    </div>
  );
}

export default Recipes;
