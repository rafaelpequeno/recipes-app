import React from 'react';
import { useHistory } from 'react-router-dom';
import MealCard from '../components/MealCard';
import DrinkCard from '../components/DrinkCard';
import CategoryMealButton from '../components/CategoryMealButton';
import CategoryDrinkButton from '../components/CategoryDrinkButton';

function Recipes() {
  const { location: { pathname } } = useHistory();

  return (
    <div>
      <section>
        {pathname === '/meals'
          && <CategoryMealButton />}
        {pathname === '/drinks'
          && <CategoryDrinkButton />}
      </section>
      <section>
        {pathname === '/meals'
          && <MealCard />}
        {pathname === '/drinks'
          && <DrinkCard />}
      </section>
    </div>
  );
}

export default Recipes;
