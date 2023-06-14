import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import DoneRecipes from './pages/DoneRecipes';
import DrinkDetails from './pages/DrinkDetails';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import MealDetails from './pages/MealDetails';
// import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route path="/meals/:id" component={ MealDetails } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route path="/drinks/:id" component={ DrinkDetails } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
