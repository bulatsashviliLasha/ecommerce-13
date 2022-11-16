import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProductToCart } from '../../actions/cartActions';
import EmptyCartImage from '../../images/empty-cart';

class ProductCard extends Component {
  render() {
    const { product, selectedCurrency, addProductToCart } = this.props;

    const currentProduct = product;
    let productPriceCurrency = currentProduct.prices.filter(
      (price) => price.currency.symbol === selectedCurrency.symbol
    )[0];

    let defaultSelectedAttributes = {};

    currentProduct.attributes &&
      currentProduct.attributes.map((attribute) => {
        defaultSelectedAttributes[attribute.name] = attribute.items[0].value;
        return defaultSelectedAttributes;
      });
    return (
      <Link
        to={`/product/${currentProduct.id}`}
        className={
          currentProduct.inStock
            ? 'product-card'
            : 'product-card product-out-of-stock'
        }
      >
        <>
          <div className="product-image-container">
            <img
              className="product-image"
              src={currentProduct.gallery[0]}
              alt={currentProduct.name}
            />
            {currentProduct.inStock ? (
              <button
                className="product-cart"
                onClick={(e) => {
                  e.preventDefault();
                  addProductToCart({
                    ...currentProduct,
                    count: 1,
                    selectedAttributes: { ...defaultSelectedAttributes },
                  });
                }}
              >
                <EmptyCartImage size={24} color="white" />
              </button>
            ) : (
              <div className="no-stock">
                <p>Out of stock</p>
              </div>
            )}
          </div>

          <p className="product-name">
            {currentProduct.brand} {currentProduct.name}
          </p>

          <p className="product-price">
            {productPriceCurrency.currency.symbol} {productPriceCurrency.amount}
          </p>
        </>
      </Link>
    );
  }
}

ProductCard.propTypes = {
  selectedCurrency: PropTypes.object.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  selectedCurrency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps, { addProductToCart })(ProductCard);
