import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import DrinkDetails from './pages/DrinkDetails';
import MealDetails from './pages/MealDetails';

function App() {
  return (

    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Recipes } />
        <Route path="/meals/:id" component={ MealDetails } />
        <Route path="/drinks" component={ Recipes } />
        <Route path="/drinks/:id" component={ DrinkDetails } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ Ranking } />
        <Route path="/favorite-recipes" component={ Ranking } />
      </Switch>
    </div>

  );
}

export default App;
