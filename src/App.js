import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import DoneRecipes from './pages/DoneRecipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import './App.css';

function App() {
  return (

    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Recipes } />
        {
          /*
            <Route path="/drinks" component={ Drinks } />
          */
        }
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>

  );
}

export default App;
