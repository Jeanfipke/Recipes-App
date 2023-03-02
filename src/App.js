import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Recipes from './pages/Recipes';
import RecipesDetails from './pages/RecipesDetails';
import RecipesInProgress from './pages/RecipesInProgress';

function App() {
  return (
    <Switch>
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/meals/:id-da-receita/in-progress" component={ RecipesInProgress } />
      <Route path="/drinks/:id-da-receita/in-progress" component={ RecipesInProgress } />
      <Route path="/meals/:id-da-receita" component={ RecipesDetails } />
      <Route path="/drinks/:id-da-receita" component={ RecipesDetails } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/drinks" component={ Recipes } />
      <Route path="/meals" component={ Recipes } />
      <Route path="/profile" component={ Profile } />
      <Route exact path="/" component={ Login } />
      <Route path="/*" component={ NotFound } />
    </Switch>
  );
}

export default App;
