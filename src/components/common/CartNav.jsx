import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CartOverlay from '../cart/CartOverlay';
import Badge from './Badge';
import EmptyCartImage from '../../images/empty-cart';

class CartNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCartOverlay: false,
      qty: 0,
    };
    this.toggleShowCartOverlay = this.toggleShowCartOverlay.bind(this);
    this.hideCartOverlayModal = this.hideCartOverlayModal.bind(this);
  }

  toggleShowCartOverlay() {
    console.log('CHANGED');
    this.setState((prevState) => ({
      showCartOverlay: !prevState.showCartOverlay,
    }));
  }

  hideCartOverlayModal() {
    this.setState((prevState) => ({
      showCartOverlay: false,
    }));
  }

  calculateTotal() {
    let totalItems = 0;

    this.props.cart.items.forEach((item) => {
      totalItems = totalItems + item.count;
    });

    this.setState({ qty: totalItems });
  }

  componentDidMount() {
    this.calculateTotal();
  }

  componentDidUpdate(prevProps) {
    if (this.props.cart !== prevProps.cart) {
      this.calculateTotal();
    }
  }

  render() {
    return (
      <div>
        <div
          className="shopping-cart-container"
          onClick={this.toggleShowCartOverlay}
        >
          <EmptyCartImage size={20} color="black" />
          <Badge value={this.state.qty} />
        </div>
        <CartOverlay
          showCart={this.state.showCartOverlay}
          toggleCart={this.toggleShowCartOverlay}
          hideCart={this.hideCartOverlayModal}
        />
      </div>
    );
  }
}

CartNav.propTypes = {
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(CartNav);
