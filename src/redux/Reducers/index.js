import { combineReducers } from 'redux';
import categories from './categories';
import doneRecipesRedux from './filteredDoneRecipe';

const rootReducer = combineReducers({ categories, doneRecipesRedux });

export default rootReducer;
