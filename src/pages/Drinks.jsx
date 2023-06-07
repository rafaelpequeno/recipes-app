import React from 'react';
import { useHistory } from 'react-router-dom';
import DrinkCard from '../components/DrinkCard';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Drinks() {
  const { location: { pathname } } = useHistory();
  return (
    <div>
      <Header renderSearchComponent title="Drinks" />
      {pathname === '/drinks'
          && <DrinkCard />}
      <Footer />
    </div>
  );
}

export default Drinks;
