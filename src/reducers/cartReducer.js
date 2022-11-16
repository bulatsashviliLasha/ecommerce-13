import {
  ADD_PRODUCT_TO_CART,
  DECREASE_PRODUCT_COUNT_IN_CART,
  INCREASE_PRODUCT_COUNT_IN_CART,
} from '../actions/types';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const notyf = new Notyf();

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      console.log(
        'EXISTS ',
        state.items.some(
          (item) =>
            item.id === action.payload.id &&
            JSON.stringify(item.selectedAttributes) ===
              JSON.stringify(action.payload.selectedAttributes)
        )
      );
      // Check if product exists, and the selected attributes are the same,
      if (
        state.items.some(
          (item) =>
            item.id === action.payload.id &&
            JSON.stringify(item.selectedAttributes) ===
              JSON.stringify(action.payload.selectedAttributes)
        )
      ) {
        //  If product  exists increase the count of the product
        let newItems = state.items.map((item) =>
          item.id === action.payload.id &&
          JSON.stringify(item.selectedAttributes) ===
            JSON.stringify(action.payload.selectedAttributes)
            ? { ...item, count: item.count + 1 }
            : item
        );
        notyf.success(`${action.payload.brand} ${action.payload.name} added`);
        return { items: [...newItems] };
      } else {
        notyf.success(`${action.payload.brand} ${action.payload.name} added`);
        return { items: [...state.items, action.payload] };
      }
    case INCREASE_PRODUCT_COUNT_IN_CART:
      if (action.payload) {
        let newItems = state.items.map((item) =>
          item.id === action.payload.id &&
          JSON.stringify(item.selectedAttributes) ===
            JSON.stringify(action.payload.selectedAttributes)
            ? { ...item, count: item.count + 1 }
            : item
        );
        return { items: [...newItems] };
      }
      break;

    case DECREASE_PRODUCT_COUNT_IN_CART:
      if (action.payload.count <= 1) {
        let newItems = state.items.filter(
          (item) =>
            item.id !== action.payload.id ||
            (item.id === action.payload.id &&
              JSON.stringify(item.selectedAttributes) !==
                JSON.stringify(action.payload.selectedAttributes))
        );
        return { items: [...newItems] };
      } else {
        let newItems = state.items.map((item) =>
          item.id === action.payload.id &&
          JSON.stringify(item.selectedAttributes) ===
            JSON.stringify(action.payload.selectedAttributes)
            ? { ...item, count: item.count - 1 }
            : item
        );
        return { items: [...newItems] };
      }

    default:
      return state;
  }
};
export default cartReducer;
