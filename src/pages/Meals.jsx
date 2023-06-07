import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MealCard from '../components/MealCard';

function Meals() {
  const { location: { pathname } } = useHistory();
  return (
    <div>
      <Header renderSearchComponent title="Meals" />
      {pathname === '/meals'
          && <MealCard />}
      <Footer />
    </div>
  );
}

export default Meals;
