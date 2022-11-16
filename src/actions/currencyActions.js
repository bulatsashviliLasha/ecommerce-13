import queryApolloClient from '../queries';
import { GET_ALL_CURRENCIES_Q } from '../queries/allQueries';
import { GET_ALL_CURRENCIES, SET_SELECTED_CURRENCY } from './types';

export const fetchAllCurrencies = () => async (dispatch) => {
  let data = await queryApolloClient(GET_ALL_CURRENCIES_Q);
  dispatch({
    type: GET_ALL_CURRENCIES,
    payload: {
      currencies: data.currencies,
      selectedCurrency: data.currencies[0],
    },
  });
};

export const changeSelectedCurrency = (selectedCurrency) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_CURRENCY,
    payload: selectedCurrency,
  });
};
