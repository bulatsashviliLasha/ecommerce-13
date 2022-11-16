import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CartItemLarge from './CartItemLarge';

class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = { total: 0, qty: 0, tax: 0 };
  }

  calculateTotal() {
    let totalItems = 0;
    let totalAmount = 0;

    this.props.cart.items.forEach((item) => {
      let price = item.prices.filter(
        (price) => price.currency.symbol === this.props.selectedCurrency.symbol
      )[0];
      totalItems = totalItems + item.count;
      totalAmount = totalAmount + item.count * price.amount;
    });

    this.setState({ qty: totalItems, total: totalAmount.toFixed(2) });
  }

  componentDidMount() {
    this.calculateTotal();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.selectedCurrency !== prevProps.selectedCurrency ||
      this.props.cart !== prevProps.cart
    ) {
      this.calculateTotal();
    }
  }
  render() {
    return (
      <>
        <div
          className={this.props.showCart ? 'cart-overlay' : 'hidden'}
          onClick={this.props.hideCart}
        >
          <div className="cart-overlay-container">
            <div
              className="mini-cart"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {this.state.qty > 0 ? (
                <>
                  <p className="mini-cart-heading">
                    My Bag, {this.state.qty} item{this.state.qty > 1 ? 's' : ''}
                  </p>

                  {this.props.cart &&
                    this.props.cart.items.map((item, i) => {
                      return (
                        <CartItemLarge
                          key={'mini' + item.id + i}
                          product={item}
                          isMiniCart={true}
                        />
                      );
                    })}
                  <div className="mini-cart-totals">
                    <p className="mini-cart-total-value">Total:</p>
                    <p className="mini-cart-total-value">
                      {this.props.selectedCurrency.symbol}
                      {this.state.total}
                    </p>
                  </div>

                  <div className="mini-cart-btns">
                    <Link
                      to="/cart"
                      onClick={() => {
                        this.props.toggleCart();
                      }}
                      className="cart-btn view-cart-btn"
                    >
                      View Bag
                    </Link>
                    <Link
                      to="/checkout"
                      onClick={() => {
                        this.props.toggleCart();
                      }}
                      className="cart-btn check-out-btn"
                    >
                      Check out
                    </Link>
                  </div>
                </>
              ) : (
                <p className="empty-cart">You have no items in the cart yet.</p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

CartOverlay.propTypes = {
  cart: PropTypes.object.isRequired,
  selectedCurrency: PropTypes.object.isRequired,
  showCart: PropTypes.bool.isRequired,
  hideCart: PropTypes.func.isRequired,
  toggleCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  selectedCurrency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps)(CartOverlay);
