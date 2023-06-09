import React from 'react';
import { useHistory } from 'react-router-dom';
import MealCard from '../components/MealCard';
import DrinkCard from '../components/DrinkCard';
import CategoryMealButton from '../components/CategoryMealButton';
import CategoryDrinkButton from '../components/CategoryDrinkButton';
import Header from '../components/Header';
import Footer from '../components/Footer';


function Recipes() {
  const { location: { pathname } } = useHistory();

  return (
    <>
    <Header renderSearchComponent title="Meals" />
      <section>   
      {pathname === '/meals'
          && <CategoryMealButton />}
        {pathname === '/drinks'
          && <CategoryDrinkButton />
      </section>
         <section>
        {pathname === '/meals'
          && <MealCard />}
        {pathname === '/drinks'
          && <DrinkCard />}
        </section>
      <Footer />
    </>
  );
}

export default Recipes;
