import React, { Component } from 'react';
import '../errors/styles.css';
import { pageTitle } from '../../utils/pageTitle';

class CheckOut extends Component {
  render() {
    pageTitle('Checkout');
    return (
      <div className="center-pt50">
        <div>Thank you for shopping with us.</div>
        <div>We'll send a confirmation when your package ships.</div>
      </div>
    );
  }
}

export default CheckOut;
