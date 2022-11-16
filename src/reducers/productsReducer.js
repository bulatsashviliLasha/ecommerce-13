import { FETCH_PRODUCTS_BY_CATEGORY } from '../actions/types';

const initialState = {
  products: [],
  product: {},
};

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
}
export default productsReducer;
