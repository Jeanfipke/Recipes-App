import { combineReducers } from 'redux';
import categories from './categories';
import filtredRecipes from './filtredRecipes';

const rootReducer = combineReducers({ categories, filtredRecipes });

export default rootReducer;
