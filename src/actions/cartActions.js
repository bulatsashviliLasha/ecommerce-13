import {
  ADD_PRODUCT_TO_CART,
  DECREASE_PRODUCT_COUNT_IN_CART,
  INCREASE_PRODUCT_COUNT_IN_CART,
  REMOVE_PRODUCT_FROM_CART,
} from './types';

export const addProductToCart = (product) => (dispatch) => {
  dispatch({
    type: ADD_PRODUCT_TO_CART,
    payload: product,
  });
};

export const deleteProductToCart = (productId) => (dispatch) => {
  dispatch({
    type: REMOVE_PRODUCT_FROM_CART,
    payload: productId,
  });
};

export const increaseProductInCart = (product) => (dispatch) => {
  dispatch({
    type: INCREASE_PRODUCT_COUNT_IN_CART,
    payload: product,
  });
};

export const decreaseProductInCart = (product) => (dispatch) => {
  dispatch({
    type: DECREASE_PRODUCT_COUNT_IN_CART,
    payload: product,
  });
};
