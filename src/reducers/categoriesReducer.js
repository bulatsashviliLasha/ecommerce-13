import { FETCH_ALL_CATEGORIES, SET_SELECTED_CATEGORY } from '../actions/types';

const initialState = {
  items: [],
  selectedCategory: '',
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_CATEGORIES:
      return {
        ...state,
        items: action.payload.categories,
        selectedCategory: action.payload.selectedCategory,
      };

    case SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload.selectedCategory,
      };

    default:
      return state;
  }
};
export default categoriesReducer;
