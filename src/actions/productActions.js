import queryApolloClient from '../queries';
import { GET_PRODUCTS_BY_CATEGORY_Q } from '../queries/allQueries';
import { FETCH_PRODUCTS_BY_CATEGORY } from './types';

export const fetchProductByCategory = (categoryName) => async (dispatch) => {
  let data = await queryApolloClient(GET_PRODUCTS_BY_CATEGORY_Q, {
    input: { title: categoryName },
  });

  dispatch({
    type: FETCH_PRODUCTS_BY_CATEGORY,
    payload: data.category.products,
  });
};
