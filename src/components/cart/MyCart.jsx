import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItemFullView from './CartItemLarge';
import './cart.css';
import { pageTitle } from '../../utils/pageTitle';

class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = { total: 0, qty: 0, tax: 0 };
  }

  calculateTotal() {
    let totalItems = 0;
    let totalAmount = 0;

    this.props.cart.items.forEach((item) => {
      console.log(item);
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
    const { cart, selectedCurrency } = this.props;
    pageTitle('Cart');
    return (
      <div className="my-cart-wrapper">
        <h1 className="cart-heading">Cart</h1>

        {cart &&
          cart.items.map((item, i) => {
            return (
              <CartItemFullView key={'fullCart' + item.id + i} product={item} />
            );
          })}

        {cart && cart.items.length <= 0 ? (
          <p className="total-value">
            Bag is empty. There no products in the cart yet
          </p>
        ) : (
          <div className="totals">
            <hr />
            <p className="total-label">
              Tax:{' '}
              <span className="total-value" title="Tax is 5% of total price">
                {selectedCurrency.symbol}
                {(this.state.total * 0.05).toFixed(2)}
              </span>
            </p>
            <p className="total-label">
              Qty: <span className="total-value">{this.state.qty}</span>
            </p>
            <p className="total-label">
              Total:{' '}
              <span className="total-value">
                {selectedCurrency.symbol}
                {this.state.total}
              </span>
            </p>

            <Link className="order-btn" to="/checkout">
              Order
            </Link>
          </div>
        )}
      </div>
    );
  }
}

MyCart.propTypes = {
  cart: PropTypes.object.isRequired,
  selectedCurrency: PropTypes.object,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  selectedCurrency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps)(MyCart);
