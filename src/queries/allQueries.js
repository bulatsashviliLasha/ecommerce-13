import { gql } from '@apollo/client/core';

// GET ALL CATEGORIES
export const GET_ALL_CATEGORIES_Q = gql`
  {
    categories {
      name
    }
  }
`;

// GET ALL CURRENCIES
export const GET_ALL_CURRENCIES_Q = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

// GET PRODUCTS BY CATEGORY
export const GET_PRODUCTS_BY_CATEGORY_Q = gql`
  query CategoryProducts($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
        name
        brand
        attributes {
          name
          type
          items {
            displayValue
            value
          }
        }
        prices {
          currency {
            symbol
          }
          amount
        }
        inStock
        gallery
        description
        category
      }
    }
  }
`;

// GET PRODUCT BY ID
export const GET_PRODUCT_BY_ID_Q = gql`
  query ProductDetails($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      description
      category
      brand
      attributes {
        name
        type
        items {
          displayValue
          value
        }
      }
      gallery
      prices {
        currency {
          symbol
        }
        amount
      }
    }
  }
`;
