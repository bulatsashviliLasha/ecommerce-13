import { GET_ALL_CURRENCIES, SET_SELECTED_CURRENCY } from '../actions/types';

const initialState = {
  items: [],
  selectedCurrency: {},
};

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CURRENCIES:
      return {
        ...state,
        items: action.payload.currencies,
        selectedCurrency: action.payload.selectedCurrency,
      };

    case SET_SELECTED_CURRENCY:
      return {
        ...state,
        selectedCurrency: action.payload,
      };

    default:
      return state;
  }
};
export default currencyReducer;
