import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import DoneRecipes from './pages/DoneRecipes';
import DrinkDetails from './pages/DrinkDetails';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import MealDetails from './pages/MealDetails';
import Profile from './pages/Profile';
import RecipeInProgress from './pages/RecipeInProgress';
import Recipes from './pages/Recipes';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/meals/:id" component={ MealDetails } />
        <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/drinks/:id" component={ DrinkDetails } />
        <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
