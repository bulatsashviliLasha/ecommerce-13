import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './product.css';
import ProductCard from './ProductCard';
import { pageTitle } from '../../utils/pageTitle';

class ProductList extends Component {
  render() {
    const { selectedCategory, products } = this.props;
    let categoryName = selectedCategory;
    categoryName = categoryName.at(0).toUpperCase() + categoryName.slice(1);
    pageTitle(categoryName);
    return (
      <div
        style={{
          paddingLeft: '20px',
          paddingRight: '20px',
          maxWidth: '1300px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <h1 className="category-name">{categoryName}</h1>
        <div className="products-container">
          {products.products.map((product, i) => (
            <ProductCard key={i + product.id + i} product={product} />
          ))}
        </div>
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.object,
  selectedCategory: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
  selectedCategory: state.categories.selectedCategory,
});

export default connect(mapStateToProps)(ProductList);
