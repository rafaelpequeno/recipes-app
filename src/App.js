import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Profile from './pages/Profile';
import Login from './pages/Login';

function App() {
  return (

    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* <Route path="/meals" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ Ranking } />
        <Route path="/favorite-recipes" component={ Ranking } /> */}
      </Switch>
    </div>

  );
}

export default App;
