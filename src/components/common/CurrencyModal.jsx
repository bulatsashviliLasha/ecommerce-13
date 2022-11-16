import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchAllCurrencies,
  changeSelectedCurrency,
} from '../../actions/currencyActions';

class CurrencyOptionsModal extends Component {
  constructor(props) {
    super(props);
    this.props.fetchAllCurrencies();
  }

  render() {
    const {
      selectedCurrency,
      changeSelectedCurrency,
      closeModal,
      showOptions,
    } = this.props;
    const currencies = this.props.currencies.items.map((currency, i) => {
      return (
        <li
          key={i}
          className={
            currency.label === selectedCurrency.label
              ? 'currency selected-currency'
              : 'currency'
          }
          onClick={(e) => {
            changeSelectedCurrency(currency);
            e.stopPropagation();
            closeModal();
          }}
        >
          {currency.symbol} {currency.label}
        </li>
      );
    });

    return (
      <ul className={showOptions ? 'currency-modal' : 'hidden'}>
        {currencies}
      </ul>
    );
  }
}

CurrencyOptionsModal.propTypes = {
  fetchAllCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.object.isRequired,
  selectedCurrency: PropTypes.object.isRequired,
  showOptions: PropTypes.bool.isRequired,
  changeSelectedCurrency: PropTypes.func.isRequired,
  closeModal: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currencies: state.currencies,
  selectedCurrency: state.currencies.selectedCurrency,
});

export default connect(mapStateToProps, {
  fetchAllCurrencies,
  changeSelectedCurrency,
})(CurrencyOptionsModal);
