import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import categoriesReducer from './categoriesReducer';
import currencyReducer from './currencyReducer';
import productsReducer from './productsReducer';

export default combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  currencies: currencyReducer,
  cart: cartReducer,
});
