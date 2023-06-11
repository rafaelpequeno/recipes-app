import React from 'react';
import { useHistory } from 'react-router-dom';
import CategoryDrinkButton from '../components/CategoryDrinkButton';
import CategoryMealButton from '../components/CategoryMealButton';
import DrinkCard from '../components/DrinkCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MealCard from '../components/MealCard';

function Recipes() {
  const { location: { pathname } } = useHistory();

  return (
    <>
      <section>
        { pathname === '/meals'
            && (
              <div>
                <Header renderSearchComponent title="Meals" />
                <CategoryMealButton />
                <MealCard />
              </div>)}
        {pathname === '/drinks'
          && (
            <>
              <Header renderSearchComponent title="Drinks" />
              <CategoryDrinkButton />
              <DrinkCard />
            </>)}
      </section>
      <Footer />
    </>
  );
}

export default Recipes;
