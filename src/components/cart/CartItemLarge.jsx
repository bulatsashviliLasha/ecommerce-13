import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImageSlider from './ImageSlider';
import {
  increaseProductInCart,
  decreaseProductInCart,
} from '../../actions/cartActions';
import CartItemAttributes from './CartItemAttributes';

class CartItemFullView extends Component {
  render() {
    const {
      brand,
      name,
      gallery,
      prices,
      attributes,
      count,
      selectedAttributes,
    } = this.props.product;

    let productPrice = prices.filter(
      (price) => price.currency.symbol === this.props.selectedCurrency.symbol
    )[0];

    return (
      <div
        className={
          this.props.isMiniCart && this.props.isMiniCart
            ? 'cart-item-lg mini-cart-item'
            : 'cart-item-lg'
        }
      >
        <div className="cart-item-inner">
          {/* Product Brand, Name, Price */}
          <div className="item-info">
            <p className="cart-item-brand">{brand}</p>
            <p className="cart-item-name">{name}</p>
            <p className="cart-item-price">
              {productPrice.currency.symbol} {productPrice.amount}
            </p>

            {/* Attributes */}
            <CartItemAttributes
              attributes={attributes}
              isMiniCart={this.props.isMiniCart}
              selectedAttributes={selectedAttributes && selectedAttributes}
            />
          </div>

          {/* Counters and Count */}
          <div className="cart-counters">
            <button
              className="cart-item-counter"
              onClick={() => {
                this.props.increaseProductInCart(this.props.product);
              }}
            >
              +
            </button>
            <p className="cart-item-count">{count}</p>
            <button
              className="cart-item-counter"
              onClick={() => {
                this.props.decreaseProductInCart(this.props.product);
              }}
            >
              -
            </button>
          </div>

          {/* Image Slider Section */}
          <ImageSlider gallery={gallery} isMiniCart={this.props.isMiniCart} />
        </div>
      </div>
    );
  }
}
CartItemFullView.propTypes = {
  selectedCurrency: PropTypes.object.isRequired,
  increaseProductInCart: PropTypes.func.isRequired,
  decreaseProductInCart: PropTypes.func.isRequired,
  isMiniCart: PropTypes.bool,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  selectedCurrency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps, {
  increaseProductInCart,
  decreaseProductInCart,
})(CartItemFullView);
