import queryApolloClient from '../queries';
import { GET_ALL_CATEGORIES_Q } from '../queries/allQueries';
import { fetchProductByCategory } from './productActions';
import { FETCH_ALL_CATEGORIES, SET_SELECTED_CATEGORY } from './types';

export const fetchAllCategories = () => async (dispatch) => {
  let data = await queryApolloClient(GET_ALL_CATEGORIES_Q);

  fetchProductByCategory(data.categories[0].name);

  dispatch({
    type: FETCH_ALL_CATEGORIES,
    payload: {
      categories: data.categories,
      selectedCategory: data.categories[0].name,
    },
  });

  dispatch(fetchProductByCategory(data.categories[0].name));
};

export const changeSelectedCategory = (categoryName) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_CATEGORY,
    payload: {
      selectedCategory: categoryName,
    },
  });
};
