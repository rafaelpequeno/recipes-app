import React from 'react';
import { useHistory } from 'react-router-dom';
import MealCard from '../components/MealCard';
import DrinkCard from '../components/DrinkCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Recipes() {
  const { location: { pathname } } = useHistory();
  return (
    <>
      <Header renderSearchComponent title="Meals" />
      {pathname === '/meals'
          && <MealCard />}
      {pathname === '/drinks'
          && <DrinkCard />}
      <Footer />
    </>
  );
}

export default Recipes;
